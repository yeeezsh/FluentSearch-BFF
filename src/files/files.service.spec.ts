import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FILES_SCHEMA_NAME } from 'fluentsearch-types';
import { ConfigModule } from '../config/config.module';
import { FilesService } from './files.service';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        FilesService,
        { provide: getModelToken(FILES_SCHEMA_NAME), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
