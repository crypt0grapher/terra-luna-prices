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

export type ReverseSimulationResponse = {
  offer_amount: number,
  spread_amount: number,
  commission_amount: number
}
