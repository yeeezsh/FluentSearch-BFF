import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigDatabaseService } from './config/config.database.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigDatabaseService,
    }),
    UserModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        path: '/graphql',
        introspection: true,
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
        cors: {
          origin: configService.get().origin,
          credentials: true,
        },
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        sortSchema: true,
        context: ({ req, res, payload, connection }) => ({
          req,
          res,
          payload,
          connection,
        }),
      }),
    }),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
