import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PopulateProcessor } from './populate.processor';
import TerraModule from "../terra/terra.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TerraPrice, TerraPricesSchema } from "../app.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    TerraModule,
    MongooseModule.forFeature([{ name: TerraPrice.name, schema: TerraPricesSchema }]),
  ],
  providers: [PopulateProcessor],
  exports: [PopulateProcessor],
})
export class PopulateModule {}
