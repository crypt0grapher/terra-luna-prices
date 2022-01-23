export enum Swappers {
  TerraSwap,
  LOOP,
  Astroport
}

export type Swapper = keyof typeof Swappers;

export class ParamsWithSwapperName {
  swapper!: Swapper;
}

export class ParamsWithSwapperNameAndScale {
  swapper!: Swapper;
  scale!: number;
}

export class ParamsWithStartDateAndPeriod {
  startDate!: number;
  period!: number;
}

export interface PoolResponse {
  "assets": [
    {
      "info": {
        "token": {
          "contract_addr": string;
        }
      },
      "amount": string;
    },
    {
      "info": {
        "native_token": {
          "denom": "uluna"
        }
      },
      "amount": string;
    }
  ],
  "total_share": string;
}


export interface SimulationResponse {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
}

//real bLuna price for 1 uLuna: simulate swap 1uLuna and get how much bLuna is received, then vice versa:
//simulate swap 1bLuna and see how many uLuna will be received
export type Simulations = {
  [swapper in Swapper]: {
    bLunaPriceInuLuna: SimulationResponse,
    uLunaPriceInbLuna: SimulationResponse
  }
};

