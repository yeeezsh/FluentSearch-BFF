import { User } from '../models/user.model';

export type UserQuery = Omit<User, 'password'>;
export type UsersQuery = Array<Omit<User, 'password'>>;
