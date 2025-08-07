import { Router } from 'express';
import auth from './company-auth/auth.route';
import counter from './counter/counter.route';
import token from './token/token.route';
import tokenList from './token-list/token.route';
import userAuth from './user-auth/user-auth.route';
import { validateProcessTokenAuthUser } from '@/middlewares/validate-process-token-auth-user';

const processTokenRoutes: Router = Router();

processTokenRoutes.use('/auth', auth);
processTokenRoutes.use('/user-auth', userAuth);
processTokenRoutes.use('/counter', counter);
processTokenRoutes.use('/token', validateProcessTokenAuthUser, token);
processTokenRoutes.use('/token-list', validateProcessTokenAuthUser, tokenList);

export default processTokenRoutes;
