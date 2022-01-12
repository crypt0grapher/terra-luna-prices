import { Swapper } from './swappers';

export type Price = {
  [swapper in Swapper]: number;
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

