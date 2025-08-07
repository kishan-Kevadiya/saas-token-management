import Api from '@/lib/api';
import TokenService from './token.service';
import { CustomResponse } from '@/types/common.type';
import { Request, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { tokenDto } from './dto/token.dto';

export default class TokenController extends Api {
  private readonly tokenService: TokenService;

  constructor(tokenService?: TokenService) {
    super();
    this.tokenService = tokenService ?? new TokenService();
  }

  public updateTokenStatus = async (
    req: Request,
    res: CustomResponse<tokenDto>,
    _next: NextFunction
  ) => {
    try {
      await this.tokenService.updateTokenStatus(
        req.body,
        res.locals.currentUser,
        req.query.id as string
      );

      this.send(
        res,
        null,
        HttpStatusCode.Ok,
        'Token status updated successfully.'
      );
    } catch (e) {
      _next(e);
    }
  };

  public getActiveToken = async (
    req: Request,
    res: CustomResponse<tokenDto>,
    next: NextFunction
  ) => {
    try {
      const activeToken = await this.tokenService.getActiveToken(
        res.locals.currentUser
      );

      this.send(
        res,
        activeToken,
        HttpStatusCode.Ok,
        'Active token get successfully.'
      );
    } catch (e) {
      next(e);
    }
  };
}
