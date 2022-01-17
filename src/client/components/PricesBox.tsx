import React from "react";
import { FC, ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea
} from "recharts";
import Title from "./Title";
import dynamic from "next/dynamic";
import { PriceCandleStick, PricePoint } from "../../shared/types/price";
import { getPrices, getCandles, getAllPrices } from "../lib/api";
import { Swapper } from "../../shared/types/swappers";
import moment from "moment/moment";

const Chart = dynamic(() => import("kaktana-react-lightweight-charts"), {
  ssr: false
});


interface Props {
  children?: ReactNode;
}

const PricesBox: FC<Props> = () => {
  const [initialData, setInitialData] = React.useState([]);
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    getAllPrices().then(setInitialData);
    console.log(JSON.stringify(initialData));
  }, [date]);

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 60000);
    return () => clearInterval(timerID);
  });
  const tick = () => setDate(new Date());

      return (
    <React.Fragment>
      <LineChart width={600} height={300} data={initialData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey = 'time'
          domain = {['auto', 'auto']}
          name = 'Time'
          tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')}
          type = 'number'
        />
        <YAxis />
        <Tooltip />
      </LineChart>
    </React.Fragment>
  );
};

export default PricesBox;
