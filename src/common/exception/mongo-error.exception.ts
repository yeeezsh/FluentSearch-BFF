import { MongoHandlingEnum } from './@enums/mongo-handling.enum';
import { MongoErrorMessageType } from './@types/mongo-error.type';

const errorHandlingListConstant: Array<{
  code: MongoHandlingEnum;
  type: MongoHandlingEnum;
}> = [
  { code: MongoHandlingEnum.NotParsed, type: MongoHandlingEnum.NotParsed },
  {
    code: MongoHandlingEnum.IndexDuplicated,
    type: MongoHandlingEnum.IndexDuplicated,
  },
];

export class MongoErrorException {
  msg: string;
  type: MongoHandlingEnum;

  constructor(error: MongoErrorMessageType | any) {
    if (!error.code) {
      this.msg = String(error);
      this.type = MongoHandlingEnum.NotParsed;
      return {
        msg: String(error),
        type: MongoHandlingEnum.NotParsed,
      };
    }

    this.msg = error.name;
    this.type =
      errorHandlingListConstant.find(el => el.code === error.code)?.type ||
      MongoHandlingEnum.NotParsed;

    return {
      msg: this.msg,
      type: this.type,
    };
  }
}
