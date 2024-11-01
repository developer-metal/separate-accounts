import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configConnect } from './config/config-connection';
import { SeparateAccountsModule } from './separate_accounts/separate_accounts.module';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from './config/config-options';

@Module({
  imports: [MongooseModule.forRootAsync(configConnect), 
    ConfigModule.forRoot(configOptions), 
    SeparateAccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
