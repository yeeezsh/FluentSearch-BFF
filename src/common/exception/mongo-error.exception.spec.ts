import { MongoHandlingEnum } from './@enums/mongo-handling.enum';
import { MongoErrorMessageType } from './@types/mongo-error.type';
import { MongoErrorException } from './mongo-error.exception';

describe('MongoErrorException Tests', () => {
  const mockCanParsingErrorMsg: MongoErrorMessageType = {
    name: 'test',
    index: 0,
    driver: true,
    code: MongoHandlingEnum.IndexDuplicated,
  };
  const mockCannotParsingErrorMsg: MongoErrorMessageType = {
    name: 'test',
    index: 0,
    driver: true,
    code: 12345,
  };

  it('Should parsed correctly', () => {
    const parsed = new MongoErrorException(mockCanParsingErrorMsg);
    expect(parsed.type).toEqual(MongoHandlingEnum.IndexDuplicated);
  });

  it('Should return -1 when cannot parsed', () => {
    const parsed = new MongoErrorException(mockCannotParsingErrorMsg);
    expect(parsed.type).toEqual(MongoHandlingEnum.NotParsed);
  });
});
