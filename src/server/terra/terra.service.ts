import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {LCDClient, Coin} from '@terra-money/terra.js';

const chain_id = 'columbus-5';
const node = 'https://lcd.terra.dev';

const bLuna = {
    'columbus-5': 'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp',
    'bombay-12': 'terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x',
};

const bLunaPair = {
    'columbus-5': 'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p',
    'bombay-12': 'terra13e4jmcjnwrauvl2fnjdwex0exuzd8zrh5xk29v',
}


@Injectable()
export class TerraService {
    private terra: LCDClient;

    constructor() {
        this.terra = new LCDClient({
            URL: node,
            chainID: chain_id,
        });
    }


    async getCurrentBlock() {
        return Number((await this.terra.tendermint.blockInfo()).block.header.height);
    }

}
