import {DynamicModule, MiddlewareConsumer, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './utils/logger.middleware';
import TerraModule from './terra/terra.module';
import {TerraPrice, TerraPricesSchema} from './app.schema';
import { PopulateModule } from './populate/populate.module';

declare const module: any;

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  public static initialize(): DynamicModule {
    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
        viewsDir: null,
      });

    if (module.hot) {
      module.hot.dispose((data: any) => {
        data.renderModule = renderModule;
      });
    }

    return {
      module: AppModule,
      imports: [
        ConfigModule,
        ScheduleModule.forRoot(),
        BullModule.forRoot({
            redis: {
              host: 'localhost',
              port: 6379,
            },
        }),
        BullModule.registerQueue({
          name: 'populate-db-from-blockchain',
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            const connectionString = configService.get('MONGODB_CONNECTION_STRING');
            return {
              uri: connectionString,
            };
          },
          inject: [ConfigService],
        }),
          MongooseModule.forFeature([{ name: TerraPrice.name, schema: TerraPricesSchema }]),
          PopulateModule,
          renderModule,
          TerraModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
