import { BadRequestException, HttpException } from '@nestjs/common';
import { MongoHandlingEnum } from './@enums/mongo-handling.enum';
import { MongoErrorMessageType } from './@types/mongo-error.type';

const errorHandlingListConstant: Array<{
  code: MongoHandlingEnum;
  type: MongoHandlingEnum;
  error: (msg?: string) => HttpException;
}> = [
  {
    code: MongoHandlingEnum.NotParsed,
    type: MongoHandlingEnum.NotParsed,
    error: msg => new BadRequestException('Unhandling error : ' + msg),
  },
  {
    code: MongoHandlingEnum.IndexDuplicated,
    type: MongoHandlingEnum.IndexDuplicated,
    error: msg => new BadRequestException('Index duplicated : ' + msg),
  },
];

export class MongoErrorException {
  msg: string;
  type: MongoHandlingEnum;
  error: HttpException | BadRequestException;

  constructor(error: MongoErrorMessageType | any, msg?: string) {
    // default
    if (!error.code) {
      this.msg = String(error);
      this.type = MongoHandlingEnum.NotParsed;
      this.error = new BadRequestException('Unhandling error');
      throw this.error;
    }

    // this.msg = error.name;
    const mapError = errorHandlingListConstant.find(
      el => el.code === error.code,
    );
    if (mapError) {
      throw mapError.error(msg);
    }
  }
}
