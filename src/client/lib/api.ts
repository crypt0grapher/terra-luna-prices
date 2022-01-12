import { Swapper } from "../../shared/types/swappers";
import { PriceCandleStick, PricePoint } from "../../shared/types/price";
import { fetch } from "../../shared/utils/fetch";


export const getPrices = async (swapper: Swapper) => await fetch(`api/prices/${swapper}`);
export const getCandles = async (swapper: Swapper) => await fetch(`api/candles/${swapper}/3`);
