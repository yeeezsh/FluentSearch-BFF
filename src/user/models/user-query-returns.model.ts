import { UserDocument } from '../schemas/user.schema';

export type UserQueryReturns = Omit<UserDocument, 'password'> | null;
export type UsersQueryReturns = Omit<UserDocument, 'password'>[] | [];
