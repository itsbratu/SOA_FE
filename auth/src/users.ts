import * as bcrypt from 'bcryptjs';
import { User } from 'src/user';

export const usersData: User[] = [
  {
    email: 'itsbratu@gmail.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    email: 'itsbratu@outlook.com',
    password: bcrypt.hashSync('password123', 10),
  },
];
