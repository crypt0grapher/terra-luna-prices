import { createContext } from "react";
import { TradeParams } from "../../shared/types/trade";

export interface ITradeContext {
  tradeParams: TradeParams,
  setTradeParams?: (buyAt?: number, sellAt?: number) => void
}

export const defaultTrade: ITradeContext = {
  tradeParams: {
    buyAt: 0.90,
    sellAt: 0.98
  }
};

const TradeContext = createContext<ITradeContext>(defaultTrade);

export default TradeContext;
