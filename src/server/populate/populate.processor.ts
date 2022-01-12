import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from "@nestjs/common";
import { Job } from 'bull';
import { TerraService } from "../terra/terra.service";
import { InjectModel } from "@nestjs/mongoose";
import { TerraPrice, TerraPriceDocument } from "../app.schema";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";

@Processor('populate-db-from-blockchain')
export class PopulateProcessor {
  private readonly logger = new Logger(PopulateProcessor.name);

  constructor( @InjectModel(TerraPrice.name) private terraPriceModel: Model<TerraPriceDocument>,
               private configService: ConfigService,
               private terraService: TerraService,
               ) {}


  @Process('populate')
  async handlePopulate(job: Job) {
    const prices = await this.terraService.getPriceData();
    if (prices) {
      const document = new this.terraPriceModel({ time: new Date(), prices: prices });
      await document.save();
    }
    await job.progress(100);
    return {};
  }
}
