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
import { Swapper, Swappers } from "../../shared/types/swappers";
import moment from "moment/moment";
import Moment from "react-moment";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

type SwapperPointData = {
  [key in Swapper]: number
};

type SwapperColor = {
  [key in Swapper]: string
};

type ChartPointData = SwapperPointData & { time: number };

interface Props {
  startDate: number,
  period: number
}

const swapperColor: SwapperColor = {
  TerraSwap: "#0884d8",
  LOOP: "#670862",
  Astroport: "#00008B"
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number | string, number | string>) => {
  // console.log(JSON.stringify(payload));
  if (active && payload && payload.length)
    return <>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <Moment format="HH:mm:ss DD/MM/YYYY">{new Date(label)}</Moment>
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {payload.map((item) => {
                  // @ts-ignore
                  const lineColor = swapperColor[item.dataKey];
                  return <>
                    <TableRow>
                      <TableCell>
                        <Typography color={lineColor}>
                          {item.dataKey}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color={lineColor}>
                          {Number(item.value)?.toFixed(5)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </>;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>;
  else
    return null;
};

// CustomTooltip.propTypes = {
//   type: PropTypes.string,
//   payload: PropTypes.array,
//   label: PropTypes.string,
// }


const PricesBox: FC<Props> = ({ startDate, period }) => {
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
            type="monotone"
            dataKey="TerraSwap"
            stroke={swapperColor.TerraSwap}
            dot={false}
            strokeWidth={2}
            animationDuration={300}
          />
          <Line
            type="monotone"
            dataKey="LOOP"
            stroke={swapperColor.LOOP}
            dot={false}
            strokeWidth={2}
            animationDuration={300}
          />
          <Line
            type="monotone"
            dataKey="Astroport"
            stroke={swapperColor.Astroport}
            dot={false}
            strokeWidth={2}
            animationDuration={300}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
            name="Time"
            tickFormatter={(unixTime) => moment(unixTime).format("DD/MM HH:mm")}
            type="number"
          />
          <YAxis
            orientation="left"
            allowDataOverflow
            domain={["auto", "auto"]}
            type="number"
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend wrapperStyle={{ top: 10, left: 25 }} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default PricesBox;
