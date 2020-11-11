import { MongoHandlingEnum } from './@enums/mongo-handling.enum';
import { MongoErrorMessageType } from './@types/mongo-error.type';
import { MongoErrorException } from './mongo-error.exception';

export const mockIndexDuplicatedErrorMsg: MongoErrorMessageType = {
  name: 'MongoError',
  index: 0,
  driver: true,
  code: MongoHandlingEnum.IndexDuplicated,
};
const mockUnhandlingErrorMsg: MongoErrorMessageType = {
  name: 'MongoError',
  index: 0,
  driver: true,
  code: 12345,
};
const mockNotInstanceOfMongoErrorMsg = 'test message';

describe('MongoErrorException Tests', () => {
  it('Should parsed correctly', () => {
    const parsed = new MongoErrorException(mockIndexDuplicatedErrorMsg);
    expect(parsed.type).toEqual(MongoHandlingEnum.IndexDuplicated);
  });

  it('Should return -1 when cannot parsed', () => {
    const parsed = new MongoErrorException(mockUnhandlingErrorMsg);
    expect(parsed.type).toEqual(MongoHandlingEnum.NotParsed);
  });

  it('Should return -1 when error is not instanceof MongoErrorMessageType', () => {
    const parsed = new MongoErrorException(mockNotInstanceOfMongoErrorMsg);
    expect(parsed.type).toEqual(MongoHandlingEnum.NotParsed);
  });
});
