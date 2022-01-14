import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {LCDClient, Coin} from '@terra-money/terra.js';
import { Price } from "../../shared/types/price";
import { bLunaPairAddresses, chain_id, node } from "../../shared/constants/env";
import { Swapper, SimulationResponse, Simulations, PoolResponse} from "../../shared/types/swappers";


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

    async getPriceData(): Promise<Price[] | null> {
        try {
            let response = [];
            let swapper: keyof typeof bLunaPairAddresses;
            for(swapper in bLunaPairAddresses) {
                const poolResponse: PoolResponse = await this.terra.wasm.contractQuery(
                  bLunaPairAddresses[swapper],
                  {
                      "pool": {}
                  }
                );
                const price = {[swapper]: Number(poolResponse.assets[1].amount) / Number(poolResponse.assets[0].amount)} as Price;
                response.push(price);
            }
            return response;
        } catch (e) {
            this.logger.log(`Terra error ${e}`);
            return null;
        }
    }

    async simulateSwapuLunaForbLuna(amount=1000000): Promise<Price[] | null> {
        try {
            let response = [];
            let swapper: keyof typeof bLunaPairAddresses;
            for(swapper in bLunaPairAddresses) {
                const simulationResponse: SimulationResponse = await this.terra.wasm.contractQuery(
                  bLunaPairAddresses[swapper],
                  {
                      simulation: {
                          offer_asset: {
                              amount: amount.toString(),
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
