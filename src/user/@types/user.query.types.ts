import { User } from '../interfaces/user.interface';

export type UserQuery = Omit<User, 'password'>;
export type UsersQuery = Array<Omit<User, 'password'>>;
