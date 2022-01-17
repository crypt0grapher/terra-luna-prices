import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from "@nestjs/common";
import { Job } from 'bull';
import { TerraService } from "../terra/terra.service";
import { InjectModel } from "@nestjs/mongoose";
import { TerraPrice, TerraPriceDocument } from "../app.schema";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { setTimeout } from "timers/promises";
import { setIntervalAsync} from "set-interval-async/dynamic";
import { clearIntervalAsync } from 'set-interval-async'


export class PopulateProcessor {
  private readonly logger = new Logger(PopulateProcessor.name);

  constructor( @InjectModel(TerraPrice.name) private terraPriceModel: Model<TerraPriceDocument>,
               private configService: ConfigService,
               private terraService: TerraService,
               ) {}

  async handlePopulate() {
    setIntervalAsync( () =>
    this.terraService.getPriceData().then(prices => {
      if (prices) {
        const document = new this.terraPriceModel({ time: new Date(), prices: prices });
        this.logger.debug(JSON.stringify(document));
        document.save();
      }
    }),
      3000);
  }
}
