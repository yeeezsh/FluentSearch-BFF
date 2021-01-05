import { BadRequestException } from '@nestjs/common';

export class DuplcatedEmailException extends BadRequestException {
  constructor(error?: string) {
    super('Duplicated email', error);
  }
}
