import React from "react";
import { FC, ReactNode } from "react";
import Title from "./Title";
import dynamic from "next/dynamic";
import { PriceCandleStick, PricePoint } from "../../shared/types/price";
import { getPrices, getCandles } from "../lib/api";
import { Swapper } from "../../shared/types/swappers";

const Chart = dynamic(() => import("kaktana-react-lightweight-charts"), {
  ssr: false
});

const priceChart = {
  options: {
    localization: {
      priceFormatter: (price: string) => Number(price).toFixed(4)
    },
    priceScale: {
      position: "left",
      mode: 1,
      autoScale: true,
      invertScale: false,
      alignLabels: false,
      borderVisible: false,
      borderColor: "#555ffd",
      scaleMargins: {
        top: 0.2,
        bottom: 0.1
      }
    },
    alignLabels: true,
    timeScale: {
      rightOffset: 12,
      // leftOffset: 12,
      barSpacing: 3,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: false,
      borderVisible: true,
      borderColor: "#fff000",
      visible: true,
      timeVisible: true,
      secondsVisible: true

    },
    priceFormat: {
      type: "price",
      precision: 6,
      minMove: 0.000001
    }
  },
  candlestickSeries: [],
  lineSeries: []
};

interface Props {
  swapper: Swapper;
  candles: boolean;
  children?: ReactNode;
}

const ChartBox: FC<Props> = ({ ...props }) => {
  const { swapper, candles } = props;
  const [dataCandle, setDataCandle] = React.useState<PriceCandleStick[]>([]);
  const [dataLine, setDataLine] = React.useState<PricePoint[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if (!candles)
      getPrices(swapper).then(setDataLine);
  }, [date]);

  React.useEffect(() => {
    if (candles)
      getCandles(swapper).then(setDataCandle);
  }, [date]);

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 60000);
    return () => clearInterval(timerID);
  });
  const tick = () => setDate(new Date());

  return (
    <React.Fragment>
      <Title>bLuna {swapper} {candles? "1m Candle Stick Chart" : "Price"} (in Luna)</Title>
      {candles ?
        <Chart options={priceChart.options} candlestickSeries={[{ data: dataCandle }]} autoWidth height={180} />
        :
        <Chart options={priceChart.options} lineSeries={[{ data: dataLine }]} autoWidth height={180} />
      }
    </React.Fragment>
  );
};

export default ChartBox;
