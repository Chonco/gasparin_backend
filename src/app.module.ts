import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OfferModule } from './offer/offer.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [SharedModule, ConfigModule.forRoot({
    load: [configuration]
  }), UserModule, AuthModule, OfferModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
