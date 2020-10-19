import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { UserService } from './app.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
