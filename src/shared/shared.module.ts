import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                database: configService.get('database.name'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                autoLoadEntities: true,
                synchronize: true,
                debug: false,
            })
        })
    ]
})
export class SharedModule { }
