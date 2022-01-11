import { Module } from '@nestjs/common';
import {TerraService} from './terra.service';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [TerraService],
    exports: [TerraService]
})
class TerraModule {}

export default TerraModule;
