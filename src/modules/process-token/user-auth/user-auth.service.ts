import { HttpBadRequestError } from "@/lib/errors";
import bcrypt from "bcrypt";
import { generateJWTToken } from "@/utils/generate-jwt-token";
import { LoginInputDto } from "./dto/login.input.dto";
import prisma from "@/lib/prisma";
import { CurrentUserDto } from "../company-auth/dto/current-user.dto";
import { UserResponseDto } from "./dto/current-user-auth.dto";

export default class UserAuthService {
  private async fetchUserInfo(whereClause) {
    return await prisma.ht_users.findFirst({
      where: whereClause,
      include: {
        ht_company: {
          include: {
            ht_counter_filter: true,
          },
        },
        ht_department: true,
      },
    });
  }

  public mapUserResponse(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      contact_no: user.contact_no,
      username: user.username,
      data: user.data ?? null,
      is_active: user.is_active ?? 1,
      counter_id: user.counter_id,
      counter_details: {
        id: user.counter_details.id,
        hash_id: user.counter_details.hash_id,
        counter_name: user.counter_details.counter_name,
        counter_no: user.counter_details.counter_no,
      },
      company: user.ht_company
        ? {
          id: user.ht_company.id,
          hash_id: user.ht_company.hash_id,
          company_name: user.ht_company.company_name,
        }
        : null,
      department: user.ht_department
        ? {
          id: user.ht_department.hash_id,
          english_name: user.ht_department.english_name,
          dept_hindi_name: user.ht_department.dept_hindi_name,
          dept_regional_name: user.ht_department.dept_regional_name,
        }
        : null,
      session_log_id: user.session_log_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  public async login(
    data: LoginInputDto,
    currentUser: CurrentUserDto
  ): Promise<any> {
    const userInfo = await this.fetchUserInfo({
      username: data.username,
      company_id: currentUser.id,
      deleted_at: null,
    });

    if (!userInfo) {
      throw new HttpBadRequestError("Invalid credentials!");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      userInfo.password
    );
    if (!isPasswordValid) {
      throw new HttpBadRequestError("Invalid credentials!");
    }

    const counterResult = await prisma.ht_counter_filter.findUnique({
      where: {
        hash_id: data.counter_id,
        company_id: currentUser.id,
        deleted_at: null,
      },

      select: {
        id: true,
        hash_id: true,
        counter_name: true,
        counter_no: true,
        is_logged_in: true,
      },
    });

    if (!counterResult) {
      throw new HttpBadRequestError("Invalid counter!");
    }

    if (counterResult.is_logged_in) {
      throw new HttpBadRequestError("This counter is currently occupied by another user.");
    }

    await prisma.ht_counter_filter.update({
      where: {
        id: counterResult.id,
        deleted_at: null,
      },
      data: {
        is_logged_in: 1
      }
    });

    const createSessionLog = await prisma.ht_user_session_logs.create({
      data: {
        user_id: userInfo.id,
        counter_id: counterResult.id,
        company_id: currentUser.id,
      },
      select: {
        hash_id: true,
      },
    });

    const token = generateJWTToken({
      sub: userInfo.hash_id,
      username: userInfo.username,
      counter_id: counterResult.hash_id,
      session_log_id: createSessionLog.hash_id,
    });

    return {
      token,
      user: this.mapUserResponse({ ...userInfo, counter_details: counterResult, session_log_id: createSessionLog.hash_id }),
    };
  }

  public async getUserDetailsByHashId(
    userId: string,
    counterId?: string,
    sessionLogId?: string
  ): Promise<any> {
    const userInfo = await this.fetchUserInfo({
      hash_id: userId,
      deleted_at: null,
    });

    let counterResult;
    if (counterId) {
      counterResult = await prisma.ht_counter_filter.findUnique({
        where: {
          hash_id: counterId,
          deleted_at: null,
        },
        select: {
          id: true,
          hash_id: true,
          counter_name: true,
          counter_no: true,
        },
      });

      if (!counterResult) {
        throw new HttpBadRequestError("Invalid counter!");
      }
    }

    if (!userInfo) {
      return null;
    }

    return this.mapUserResponse({ ...userInfo, counter_details: counterResult, session_log_id: sessionLogId });
  }

  public async logout(currentUser: UserResponseDto): Promise<void> {
    await prisma.ht_counter_filter.update({
      where: {
        id: currentUser.counter_details.id,
      },
      data: {
        is_logged_in: 0
      }
    })

    await prisma.ht_user_session_logs.update({
      where: {
        hash_id: currentUser.session_log_id,
      },
      data: {
        logout_time: new Date(),
      },
    });
  };
};
