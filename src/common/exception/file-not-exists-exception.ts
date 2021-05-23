import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotExisistException extends HttpException {
  constructor() {
    super('Invalid resouce owner credential', HttpStatus.NOT_FOUND);
  }
}
