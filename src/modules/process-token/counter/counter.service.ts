// import { type CurrentUserDto } from '../auth/dto/current-user.dto';
import { type CounterResponseBodyDto } from './dto/counter.dto';
import prisma from '@/lib/prisma';

export default class CounterService {
  public async getCounterByCompanyId(
    currentUser: any
  ): Promise<CounterResponseBodyDto> {
    console.log('currentUser.id :>> ', currentUser.id);
    const counterResult = await prisma.ht_counter_filter.findMany({
      where: {
        company_id: currentUser.id,
        deleted_at: null,
      },
      select: {
        hash_id: true,
        counter_no: true,
        counter_name: true,
      },
    });
    console.log('counterResult :>> ', counterResult);

    return {
      counter: counterResult.map((counter) => ({
        id: counter.hash_id,
        counter_no: counter.counter_no,
        counter_name: counter.counter_name,
      })),
    };
  }
}
