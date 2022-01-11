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

const PRICES = [
  { title: 'Lorem Ipsum', id: 1 },
  { title: 'Dolore Sit', id: 2 },
  { title: 'Amet', id: 3 },
];

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
      @InjectQueue('populate-db-from-blockchain') private queue: Queue,
      @InjectModel(TerraPrice.name) private terraPriceModel: Model<TerraPriceDocument>,
      private configService: ConfigService,
      private terraService: TerraService) {
    this.queue.add('populate').then( () =>
      this.logger.log('check-and-populate-db job added to queue')
    )
  }

  getPrices() {
    return from(PRICES).pipe(toArray());
  }

  getPrice(postId: number) {
    const Price = PRICES.find(({ id }) => id === postId);

    if (!Price) {
      throw new NotFoundException();
    }

    return of(Price);
  }

}
