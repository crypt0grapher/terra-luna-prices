import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import { Price } from "../shared/types/price";

export type TerraPriceDocument = TerraPrice & Document;

@Schema({timeseries: {
        timeField: 'time'
    }})
export class TerraPrice {
    @Prop()
    time!: Date;

    @Prop()
    height!: number;

    @Prop()
    prices!: Price[];
}

export const TerraPricesSchema = SchemaFactory.createForClass(TerraPrice);
