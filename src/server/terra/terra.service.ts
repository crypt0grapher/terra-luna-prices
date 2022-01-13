import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {LCDClient, Coin} from '@terra-money/terra.js';
import { Price } from "../../shared/types/price";
import { bLunaPairAddresses, chain_id, node } from "../../shared/constants/env";
import { Swapper } from "../../shared/types/swappers";

interface SimulationResponse {
    return_amount: string;
    spread_amount: string;
    commission_amount: string;
}

@Injectable()
export class TerraService {
    private terra: LCDClient;
    private readonly logger = new Logger(TerraService.name);

    constructor() {
        this.terra = new LCDClient({
            URL: node,
            chainID: chain_id,
        });
    }

    async getBlockHeader(height?: number) {
        return (await this.terra.tendermint.blockInfo(height)).block.header;
    }

    async getPriceData(height?: number): Promise<Price[] | null> {
        try {
            let response = [];
            let swapper: keyof typeof bLunaPairAddresses;
            for(swapper in bLunaPairAddresses) {
                const simulationResponse: SimulationResponse = await this.terra.wasm.contractQuery(
                  bLunaPairAddresses[swapper],
                  {
                      simulation: {
                          offer_asset: {
                              amount: '1000000',
                              info: {
                                  native_token: {
                                      denom: 'uluna'
                                  }
                              }
                          }
                      }
                  }
                );
                const price = {[swapper]: Number(simulationResponse.return_amount) / 1000000.0 } as Price;
                response.push(price);
            }
            return response;
        } catch (e) {
            this.logger.log(`Terra error ${e}`);
            return null;
        }
    }
}
