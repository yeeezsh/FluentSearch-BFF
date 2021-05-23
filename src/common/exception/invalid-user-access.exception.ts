import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUserAccessException extends HttpException {
  constructor() {
    super('Invalid resouce owner credential', HttpStatus.FORBIDDEN);
  }
}
