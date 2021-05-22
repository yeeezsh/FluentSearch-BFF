import { UserDocument } from 'fluentsearch-types';

export type UserQueryReturns = Omit<UserDocument, 'password'> | null;
export type UsersQueryReturns = Omit<UserDocument, 'password'>[] | [];
