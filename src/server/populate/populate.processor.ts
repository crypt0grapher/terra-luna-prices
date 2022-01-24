import { Inject, Logger } from "@nestjs/common";
import { TerraService } from "../terra/terra.service";
import { InjectModel } from "@nestjs/mongoose";
import { TerraPrice, TerraPriceDocument } from "../app.schema";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { setIntervalAsync} from "set-interval-async/dynamic";
import { clearIntervalAsync } from 'set-interval-async'


export class PopulateProcessor {
  private readonly logger = new Logger(PopulateProcessor.name);

  constructor( @InjectModel(TerraPrice.name) private terraPriceModel: Model<TerraPriceDocument>,
               private configService: ConfigService,
               private terraService: TerraService,
               ) {}

  async handlePopulate() {
    setIntervalAsync( async () => {
    const contractsPool = await this.terraService.getPriceFromPool();
    const bLunaBuyPrice = await this.terraService.simulateBuyBLuna();
    const bLunaSellPrice = await this.terraService.simulateSellBLuna();

      if (contractsPool) {
        const document = new this.terraPriceModel({ time: new Date(), prices: contractsPool.prices });
        this.logger.debug(JSON.stringify(document));
        document.save();
      }
    },
      3000);
  }
}
