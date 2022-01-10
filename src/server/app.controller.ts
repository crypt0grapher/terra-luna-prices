import {
  Controller,
  Get,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from './config.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
  home() {
    return {};
  }

  @Get('/api/status')
  public getStatus() {
    // return % of database completeness querying latest block fom the blockchain and from the mongodb
    return null;
  }

  @Get('/api/prices')
  public listPrices() {
    // return this.appService.getPrices();
    return null;
  }

}
