import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_SCHEMA_NAME } from 'fluentsearch-types';
import userSchema from 'fluentsearch-types/dist/entity/user.entity';
import { MinioModule } from 'nestjs-minio-client';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthenticationModule),
    MongooseModule.forFeature([
      {
        name: USERS_SCHEMA_NAME,
        schema: userSchema,
      },
    ]),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        endPoint: config.get().minio.endpoint,
        accessKey: config.get().minio.access_key,
        secretKey: config.get().minio.secret_key,
        port: config.get().minio.port,
        useSSL: config.get().minio.ssl,
      }),
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, ConfigModule],
})
export class UserModule {}
