import { BadRequestException } from '@nestjs/common';

export class UserNotExistsException extends BadRequestException {
  constructor(error?: string) {
    super('User is not exists', error);
  }
}
