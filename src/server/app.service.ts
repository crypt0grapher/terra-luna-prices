import { Injectable, Logger } from "@nestjs/common";
import { TerraPrice, TerraPriceDocument } from "./app.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { PriceCandleStick, PricePoint } from "../shared/types/price";
import { Swapper, Swappers } from "../shared/types/swappers";
import { TerraService } from "./terra/terra.service";
import { PopulateProcessor } from "./populate/populate.processor";

const dbPricesAggregator = (swapper: string) => [
  { $unwind: "$prices" },
  { $unwind: `$prices.${swapper}` },
  {
    $group:
      {
        _id: "$time",
        price:
          { $first: `$prices.${swapper}` }
      }
  }];

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectModel(TerraPrice.name) private terraPriceModel: Model<TerraPriceDocument>,
    private populateProcessor: PopulateProcessor,
    ) {
    this.populateProcessor.handlePopulate();
  }

  //get prices for swapper in TradingView format
  async getPricesTV(swapper: Swapper) {
    const dbPrices = await this.terraPriceModel.aggregate(dbPricesAggregator(swapper));
    return dbPrices.map(item => {
      return { time: item._id.getTime() / 1000, value: Number(item.price) } as PricePoint;
    });
  }

  //get prices in Recharts format
  async getPricesRC() {
    const dbPrices = await this.terraPriceModel.find();
    return dbPrices.map(item => {
      return { time: item._id.getTime() / 1000, ...item.prices};
    });
  }

  async getCandles(swapper: Swapper, scale: number) {
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
