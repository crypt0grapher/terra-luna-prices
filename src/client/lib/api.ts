import { Swapper } from "../../shared/types/swappers";
import { fetch } from "../../shared/utils/fetch";

export const getPrices = async (swapper: Swapper) => await fetch(`api/prices/${swapper}`);
export const getCandles = async (swapper: Swapper) => await fetch(`api/candles/${swapper}/60`);
