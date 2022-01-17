import {
  Controller,
  Get, Param,
  Render,
  UseInterceptors
} from "@nestjs/common";
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';
import { ConfigInterceptor } from './config.interceptor';
import { ParamsWithSwapperName, ParamsWithSwapperNameAndScale } from "../shared/types/swappers";

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

  @Get('/api/prices/')
  public listPricesRecharts(@Param() {swapper}: ParamsWithSwapperName) {
    return this.appService.getPricesRC();
  }

  @Get('/api/prices/:swapper')
  public listPricesTradingView(@Param() {swapper}: ParamsWithSwapperName) {
    return this.appService.getPricesTV(swapper);
  }


  @Get('/api/candles/:swapper/:scale')
  public listCandles(@Param() {swapper, scale}: ParamsWithSwapperNameAndScale) {
    return this.appService.getCandles(swapper, scale);
  }

}
