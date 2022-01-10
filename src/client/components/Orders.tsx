/* eslint-disable no-script-url */

import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { makeStyles} from "@mui/styles";
import React from "react";
import Title from "./Title";

const useStyles = makeStyles((theme:any) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles(useTheme());
  //
  // const [rows, setRows] = React.useState<IOrder[]>([]);
  // React.useEffect(() => {
  //   getOrders().then(setRows);
  // }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*{rows.map((row: IOrder) => (*/}
          {/*  <TableRow key={row.id}>*/}
          {/*    <TableCell>{row.date}</TableCell>*/}
          {/*    <TableCell>{row.name}</TableCell>*/}
          {/*    <TableCell>{row.shipTo}</TableCell>*/}
          {/*    <TableCell>{row.paymentMethod}</TableCell>*/}
          {/*    <TableCell align="right">{row.amount}</TableCell>*/}
          {/*  </TableRow>*/}
          {/*))}*/}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
