import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SharedModule, ConfigModule.forRoot({
    load: [configuration]
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
