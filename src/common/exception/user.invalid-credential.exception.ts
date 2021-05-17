import { HttpException, HttpStatus } from '@nestjs/common';

export class UserInvalidCredentialException extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
