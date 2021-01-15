import {
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { DuplcatedEmailException } from '../exception/duplicated-email.exception';

@Catch(MongoError)
export class UserExceptionFilters implements ExceptionFilter {
  catch(exception: MongoError) {
    switch (exception.code) {
      case 11000: // index duplication
        throw new DuplcatedEmailException();
      default:
        throw new InternalServerErrorException();
    }
  }
}
