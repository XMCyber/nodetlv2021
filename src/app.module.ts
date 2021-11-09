import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { LoginController } from './user/login/login.controller';
import { HealthController } from './health/health.controller';
import { LoginService } from './user/login/login.service';
import { HealthcheckService } from './health/health.service';
import { User, UserSchema } from './user/login/user.schema';


@Module({
  imports: [
    MorganModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [LoginController,HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('short'),
    },
    LoginService,
    HealthcheckService,
    AppService
  ],
})
export class AppModule { }
