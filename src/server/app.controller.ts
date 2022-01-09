import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
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

  @Get('/api/prices')
  public listPrices() {
    // return this.appService.getPrices();
    return null;
  }

  @Get('/api/blog-posts/:id')
  public getPriceById(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getPrice(id);
  }
}
