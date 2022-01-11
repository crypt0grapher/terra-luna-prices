import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';

export type TerraPriceDocument = TerraPrice & Document;

@Schema({timeseries: {
        timeField: 'blockTime'
    }})
export class TerraPrice {
    @Prop()
    blockTime!: Date;

    @Prop()
    height!: number;

    @Prop()
    price!: number;
}

export const TerraPricesSchema = SchemaFactory.createForClass(TerraPrice);
