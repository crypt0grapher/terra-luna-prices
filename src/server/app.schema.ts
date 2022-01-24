import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import { Pool, Price, Simulation } from "../shared/types/price";

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

    @Prop()
    simulationsBuy!: Simulation[];

    @Prop()
    simulationsSell!: Simulation[];

    @Prop()
    pools!: Pool[];
}

export const TerraPricesSchema = SchemaFactory.createForClass(TerraPrice);
