import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {LCDClient, Coin} from '@terra-money/terra.js';
import { Pool, Price } from "../../shared/types/price";
import { bLunaPairAddresses, chain_id, node } from "../../shared/constants/env";
import { Swapper, SimulationResponse, PoolResponse} from "../../shared/types/swappers";


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

    async getPriceFromPool(): Promise<{prices: Price[], pools: Pool[] } | null> {
        try {
            const priceReturn = [];
            const poolReturn = [];
            let swapper: keyof typeof bLunaPairAddresses;
            for(swapper in bLunaPairAddresses) {
                const poolResponse: PoolResponse = await this.terra.wasm.contractQuery(
                  bLunaPairAddresses[swapper],
                  {
                      "pool": {}
                  }
                );
                const pool = {
                    [swapper]: {
                        bLunaAmount: Number(poolResponse.assets[0].amount),
                        uLunaAmount: Number(poolResponse.assets[1].amount),
                        totalShare: Number(poolResponse.total_share)
                    }
                } as Pool;
                poolReturn.push(pool);

                const price = {[swapper]: Number(poolResponse.assets[1].amount) / Number(poolResponse.assets[0].amount)} as Price;
                priceReturn.push(price);
            }
            return { prices: priceReturn, pools: poolReturn };
        } catch (e) {
            this.logger.log(`Terra error ${e}`);
            return null;
        }
    }

    async simulateBuyBLuna(amount=1000000): Promise<Price[] | null> {
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

    async simulateSellBLuna(bLunaAmount=1000000): Promise<Price[] | null> {
        try {
            let response = [];
            let swapper: keyof typeof bLunaPairAddresses;
            for(swapper in bLunaPairAddresses) {
                const simulationResponse: SimulationResponse = await this.terra.wasm.contractQuery(
                  bLunaPairAddresses[swapper],
                  {
                      simulation: {
                          offer_asset: {
                              amount: bLunaAmount.toString(),
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

    async simulateSwapuLunaForbLuna(lunaAmount=1000000): Promise<Price[] | null> {
        try {
            let response = [];
            let swapper: keyof typeof bLunaPairAddresses;
            for(swapper in bLunaPairAddresses) {
                const simulationResponse: SimulationResponse = await this.terra.wasm.contractQuery(
                  bLunaPairAddresses[swapper],
                  {
                      simulation: {
                          offer_asset: {
                              amount: lunaAmount.toString(),
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
