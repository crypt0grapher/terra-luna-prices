import { Injectable, Logger } from "@nestjs/common";
import { TerraPrice, TerraPriceDocument } from "./app.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { PriceCandleStick, PricePoint } from "../shared/types/price";
import { Swapper } from "../shared/types/swappers";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectQueue("populate-db-from-blockchain") private queue: Queue,
    @InjectModel(TerraPrice.name) private terraPriceModel: Model<TerraPriceDocument>,
    ) {
    this.queue.add("populate", { repeat: { every: 1000 } }).then(() =>
      this.logger.log("check-and-populate-db job added to queue")
    );
  }

  async getPrices(swapper: Swapper) {
    const dbPrices = await this.terraPriceModel.aggregate([
      { $unwind: "$prices" },
      { $unwind: `$prices.${swapper}` },
      {
        $group:
          {
            _id: "$time",
            price:
              { $first: `$prices.${swapper}` }
          }
      }]);
    return dbPrices.map(item => {
      return { time: item._id.getTime() / 1000, value: Number(item.price) } as PricePoint;
    });
  }

  async getCandles(swapper: Swapper, scale: number) {
    //
    // const dbPricesTest = await this.terraPriceModel.aggregate([{
    //   $group: {
    //     _id: {
    //       time: {
    //         "$dateTrunc": {
    //           "date": "$time",
    //           "unit": "second",
    //           "binSize": 60
    //         }
    //       }
    //     },
    //     high: { "$max": `$prices.${swapper}` },
    //   }}
    //   ]);
    //
    // this.logger.debug(JSON.stringify(dbPricesTest));


    const dbPrices = await this.terraPriceModel.aggregate([{
      $group: {
        _id: {
          time: {
            "$dateTrunc": {
              "date": "$time",
              "unit": "second",
              "binSize": Number(scale)
            }
          }
        },
        high: { $max: `$prices.${swapper}` },
        low: { $min: `$prices.${swapper}` },
        open: { $first: `$prices.${swapper}` },
        close: { $last: `$prices.${swapper}` }
      }},
      {
      $sort: {
        "_id.time": 1,
      },
    }]);


    return dbPrices.map(item => {
        if (item) {
          return {
            time: item._id.time.getTime() / 1000,
            high: item.high[0],
            low: item.low[0],
            open: item.open[0],
            close: item.close[0]
          } as PriceCandleStick;
        }
      }
    );
  }

}
