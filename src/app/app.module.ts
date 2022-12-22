import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from 'src/configurations';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configurations]
  }), 
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService)=>({
      dialect: "postgres",
      host: configService.get("db_host"),
      port: configService.get("db_port"),
      password: configService.get("db_password"),
      database: configService.get("db_name"),
      username: configService.get("db_username"),
      synchronize: true,
      autoLoadModels: true,
      models: []
    })
  }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
