import { Router } from 'express';
import auth from './company-auth/auth.route';
import counter from './counter/counter.route';
import { validateProcessTokenUser } from '@/middlewares/validate-process-token-user';
import token from './token/token.route';
import tokenList from './token-list/token.route';
import userAuth from './user-auth/user-auth.route';

const processTokenRoutes: Router = Router();

processTokenRoutes.use('/auth', auth);
processTokenRoutes.use('/user-auth', userAuth);
processTokenRoutes.use('/counter', validateProcessTokenUser, counter);
processTokenRoutes.use('/token', validateProcessTokenUser, token);
processTokenRoutes.use('/token-list', validateProcessTokenUser, tokenList);

export default processTokenRoutes;
