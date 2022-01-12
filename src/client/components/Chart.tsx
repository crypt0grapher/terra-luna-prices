import  React from "react";
import  { FC, ReactNode } from "react";
import Title from "./Title";
import dynamic from "next/dynamic";
import { Price, PriceCandleStick, PricePoint } from "../../shared/types/price";
import { getPrices, getCandles } from "../lib/api";
import {Swapper} from "../../shared/types/swappers";

const Chart = dynamic(() => import("kaktana-react-lightweight-charts"), {
  ssr: false
});

type THomeProps = {
  prices: Price[];
};

const priceChart = {
  options: {
    localization: {
      priceFormatter: (price: string) => Number(price).toFixed(4),
    },
    priceScale: {
      position: 'left',
      mode: 1,
      autoScale: true,
      invertScale: false,
      alignLabels: false,
      borderVisible: false,
      borderColor: '#555ffd',
      scaleMargins: {
        top: 0.2,
        bottom: 0.1,
      },
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
      secondsVisible: true,

    },
    priceFormat: {
      type: 'price',
      precision: 6,
      minMove: 0.000001,
    },
  },
  candlestickSeries: [{
    data: [
      { time: 1556877600, open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
      { time: 1556881200, open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
      { time: 1556884800, open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
      { time: 1556888400, open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
      { time: 1557129600, open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
      { time: 1557144000, open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
      { time: 1557313200, open: 173.74, high: 175.99, low: 170.95, close: 173.20 }
    ]
  }],
  lineSeries: [{
    data: [
      { time: 1556877600, value: 230.12 },
      { time: 1556881200, value: 230.24 },
      { time: 1556884800, value: 230.63 },
      { time: 1556888400, value: 231.35 },
      { time: 1556892000, value: 232.24 },
      { time: 1556895600, value: 232.52 },
      { time: 1557126000, value: 228.71 },
      { time: 1557129600, value: 228.88 },
      { time: 1557133200, value: 228.18 },
      { time: 1557136800, value: 228.89 },
      { time: 1557140400, value: 229.05 },
      { time: 1557144000, value: 229.46 },
      { time: 1557147600, value: 230.98 },
      { time: 1557151200, value: 231.71 },
      { time: 1557154800, value: 232.8 },
      { time: 1557212400, value: 233.1 },
      { time: 1557216000, value: 232.9 },
      { time: 1557219600, value: 232.9 },
      { time: 1557223200, value: 232.76 },
      { time: 1557226800, value: 232.41 },
      { time: 1557230400, value: 231.2 },
      { time: 1557234000, value: 230.83 },
      { time: 1557237600, value: 230.57 },
      { time: 1557241200, value: 231.49 },
      { time: 1557298800, value: 231.5 },
      { time: 1557302400, value: 230.87 },
      { time: 1557306000, value: 229.79 },
      { time: 1557309600, value: 230.06 },
      { time: 1557313200, value: 230.53 },
      { time: 1557316800, value: 231.04 },
      { time: 1557320400, value: 230.63 },
      { time: 1557324000, value: 230.83 },
      { time: 1557327600, value: 230 },
      { time: 1557471600, value: 228.8 },
      { time: 1557475200, value: 227.73 },
      { time: 1557478800, value: 227.73 },
      { time: 1557482400, value: 227.84 },
      { time: 1557486000, value: 228.2 },
      { time: 1557489600, value: 228.33 },
      { time: 1557493200, value: 228.6 },
      { time: 1557496800, value: 227.11 },
      { time: 1557500400, value: 227 },
      { time: 1557730800, value: 226.29 },
      { time: 1557734400, value: 227.04 },
      { time: 1557738000, value: 227.97 },
      { time: 1557741600, value: 227.85 },
      { time: 1557745200, value: 227.13 },
      { time: 1557748800, value: 225.64 },
      { time: 1557752400, value: 224.46 },
      { time: 1557756000, value: 225.22 },
      { time: 1557759600, value: 224.22 },
      { time: 1557817200, value: 225.9 },
      { time: 1557820800, value: 226.15 },
      { time: 1557824400, value: 227.9 },
      { time: 1557828000, value: 228.86 },
      { time: 1557831600, value: 228.83 },
      { time: 1557835200, value: 228.17 },
      { time: 1557838800, value: 228.71 },
      { time: 1557842400, value: 227.68 },
      { time: 1557846000, value: 227.88 },
      { time: 1557903600, value: 227.67 }
    ]
  }]
};

interface Props {
  swapper: Swapper
  candles: boolean
}

const ChartBox: FC<Props> = ({...props}) => {
  const {swapper, candles} = props;
  const [dataCandle, setDataCandle] = React.useState<PriceCandleStick[]>([]);
  const [dataLine, setDataLine] = React.useState<PricePoint[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if (!candles)
      getPrices(swapper).then(setDataLine);
  }, [date]);

  React.useEffect(() => {
    if (candles)
      getCandles(swapper).then(setDataLine);
  }, [date]);

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 5000);
    return () => clearInterval(timerID);
  });
  const tick = () => setDate(new Date());

  return (
    <React.Fragment>
      <Title>bLuna {swapper} Price (in Luna)</Title>
      {candles ?
        <Chart options={priceChart.options} candlestickSeries={[{ data: dataCandle }]} autoWidth height={180} />
        :
        <Chart options={priceChart.options} lineSeries={[{ data: dataLine }]} autoWidth height={180} />
      }
    </React.Fragment>
  );
}

export default ChartBox;
