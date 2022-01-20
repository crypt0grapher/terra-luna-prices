import React from "react";
import { FC, ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  TooltipProps
} from "recharts";
import {
  ValueType,
  NameType,
} from 'recharts/src/component/DefaultTooltipContent';
import Title from "./Title";
import dynamic from "next/dynamic";
import { PriceCandleStick, PricePoint } from "../../shared/types/price";
import { getPrices, getCandles, getAllPrices } from "../lib/api";
import { Swapper } from "../../shared/types/swappers";
import moment from "moment/moment";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { Card } from "@mui/material";

const Chart = dynamic(() => import("kaktana-react-lightweight-charts"), {
  ssr: false
});

const CustomTooltip =({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  // console.log(JSON.stringify(payload));
  if (active && payload && payload.length)
    return       <Card>
      <p className="desc"><Moment format="HH:mm:ss DD/MM/YYYY">{new Date(label)}</Moment></p>
        {payload.map((item) => {
          return <p><b>{item.dataKey}</b> {Number(item.value)?.toFixed(5)}</p>
        })}
    </Card>
  else
    return null;
}

CustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
}

const PricesBox: FC = () => {
  const [initialData, setInitialData] = React.useState([]);
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    getAllPrices().then(setInitialData);
    // console.log(JSON.stringify(initialData));
  }, []);

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 60000);
    return () => clearInterval(timerID);
  });
  const tick = () => setDate(new Date());


      return (
    <React.Fragment>
      <LineChart width={800} height={400} data={initialData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line
          type="natural"
          dataKey="TerraSwap"
          stroke="#8884d8"
          animationDuration={300}
        />
        <Line
          type="natural"
          dataKey="LOOP"
          stroke="#82ca9d"
          animationDuration={300}
        />
        <Line
          type="natural"
          dataKey="Astroport"
          stroke="#8284d8"
          animationDuration={300}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis
          dataKey = 'time'
          domain = {['auto', 'auto']}
          name = 'Time'
          tickFormatter = {(unixTime) => moment(unixTime).format('dd HH:mm')}
          type = 'number'
        />
        <YAxis
          orientation="left"
          allowDataOverflow
          domain={['auto', 'auto']}
          type="number"
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
      </LineChart>
    </React.Fragment>
  );
};

export default PricesBox;
