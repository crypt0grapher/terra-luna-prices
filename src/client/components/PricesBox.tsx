import React from "react";
import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps, ResponsiveContainer, Legend
} from "recharts";

import { getAllPricesWithDetails } from "../lib/api";
import { Swapper } from "../../shared/types/swappers";
import moment from "moment/moment";
import Moment from "react-moment";
import { Card } from "@mui/material";

type SwapperPointData = {
  [key in Swapper]: number
};

type ChartPointData = SwapperPointData & { time: number};

interface Props {
  startDate: number,
  period: number
}

const CustomTooltip =({ active, payload, label }: TooltipProps<number | string, number | string>) => {
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

// CustomTooltip.propTypes = {
//   type: PropTypes.string,
//   payload: PropTypes.array,
//   label: PropTypes.string,
// }


const PricesBox: FC<Props> = ({startDate, period}) => {
  const [chartData, setChartData] = React.useState<Array<ChartPointData>>([]);

  React.useEffect(() => {
    getAllPricesWithDetails(startDate, period).then(setChartData);
    // console.log(JSON.stringify(initialData));
  }, [startDate, period]);

      return (
    <React.Fragment>
      <ResponsiveContainer>
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line
          type="natural"
          dataKey="TerraSwap"
          stroke="#0884d8"
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
          stroke="#8232d8"
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
        <Legend wrapperStyle={{top: 0, left: 25}}/>
      </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default PricesBox;
