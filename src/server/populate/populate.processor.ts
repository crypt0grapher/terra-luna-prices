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
    this.logger.debug('Start transcoding...');
    const latestTerraBlock = await this.terraService.getCurrentBlock();

    const latestMongoBlockInDB =
      (await this.terraPriceModel.exists({}) &&
      (await this.terraPriceModel.findOne({}, {sort:{$natural:-1}}))?.height) || 0;
    const startMongoBlockToFill =  Math.max(latestMongoBlockInDB, this.configService.get('START_BLOCK') || 0) + 1;
    for (let block = startMongoBlockToFill; block <= latestTerraBlock; block++ ) {
      // this.logger.log(block);
      // const price = this.terraService.queryPriceData(block);
    }
    this.logger.debug('Transcoding completed');
  }
}
