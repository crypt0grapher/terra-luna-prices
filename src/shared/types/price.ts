import { ReverseSimulationResponse, Swapper } from "./swappers";

//LP Pool Query
export type Pool = {
  [swapper in Swapper]: {
    bLunaAmount: number,
    uLunaAmount: number,
    totalShare: number
  };
};

//Price derived from the pool, simple uLunaAmount/bLunaAmount in the pool gives the price (assuming all of them are XY=k)
//TODO public contracts available for Loop. Check on the chain and confirm.

export type Price = {
  [swapper in Swapper]: number;
};

export type Simulation = {
  [swapper in Swapper]: ReverseSimulationResponse;
};

export interface PricePoint {
  time: string | number;
  value: number | undefined;
}

export interface PriceCandleStick {
  time: string | number;
  open: number | undefined;
  close: number | undefined;
  low: number | undefined;
  high: number | undefined;
}

