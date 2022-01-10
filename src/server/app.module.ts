import {DynamicModule, MiddlewareConsumer, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './utils/logger.middleware';
// import TerraModule from './terra/terra.module';

declare const module: any;

@Module({})
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
          ScheduleModule.forRoot(),
        //  MongooseModule.forRootAsync({
        //   imports: [ConfigModule],
        //   useFactory: async (configService: ConfigService) => {
        //     const username = configService.get('MONGO_USERNAME');
        //     const password = configService.get('MONGO_PASSWORD');
        //     const database = configService.get('MONGO_DATABASE');
        //     const host = configService.get('MONGO_HOST');
        //
        //     return {
        //       uri: username ? `mongodb://${username}:${password}@${host}` : `mongodb://${host}`,
        //       dbName: database,
        //     };
        //   },
        //   inject: [ConfigService],
        // }),
          renderModule,
          // TerraModule
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
