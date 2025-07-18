import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './shared/config/env.validation';
import { MikroOrmConfigService } from './shared/database/mikroorm/MikroOrmConfigService';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MikroOrmConfigService,
    }),
    CategoriesModule,
  ],
})
export class AppModule {}
