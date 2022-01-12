import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {ConfigService, ConfigModule} from "@nestjs/config";
import { from, of, toArray } from 'rxjs';
import {Cron, CronExpression} from '@nestjs/schedule';
import {TerraService} from './terra/terra.service';
import {TerraPrice, TerraPriceDocument} from './app.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { PricePoint } from "../shared/types/price";
import { Swapper } from "../shared/types/swappers";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
      @InjectQueue('populate-db-from-blockchain') private queue: Queue,
      @InjectModel(TerraPrice.name) private terraPriceModel: Model<TerraPriceDocument>,
      private configService: ConfigService,
      private terraService: TerraService) {
    this.queue.add('populate',{repeat: {every: 1000}}).then( () =>
      this.logger.log('check-and-populate-db job added to queue')
    )
  }

  async getPrices(swapper: Swapper) {
    const dbPrices = await this.terraPriceModel.aggregate([
      {$unwind: "$prices"},
      {$unwind: `$prices.${swapper}`},
      {$group:
          {"_id":"$time",
            "price":
              {"$first":`$prices.${swapper}`}}}]);
    return dbPrices.map(item => {
        return {time: item._id.getTime()/1000, value: Number(item.price)} as PricePoint;
    })
  }

  async getCandles(swapper: Swapper, scale: number) {
    // const dbPrices = await this.terraPriceModel.aggregate([
    //   {$group: {
    //       _id: {
    //         swapper: "$symbol",
    //         time: {
    //           $dateTrunc: {
    //             date: "$time",
    //             unit: "minute",
    //             binSize: scale
    //           },
    //         },
    //       },
    //       high: { $max: "$price" },
    //       low: { $min: "$price" },
    //       open: { $first: "$price" },
    //       close: { $last: "$price" },
    //     },
    //   }
    // ]).limit(1000);

    // return dbPrices.map(item => {
    //     const price = item.prices.find(item => item[swapper]);
    //     if (price)
    //       return {time: item.time.getTime()/1000, value: price[swapper]} as PricePoint;
    //   }
    // )
  }

}
