/* eslint-disable no-script-url */

import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import {useTheme} from '@mui/system';
import Typography from "@mui/material/Typography";
import { flow } from "lodash";
import React from "react";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles(useTheme());

  // const [data, setData] = React.useState<IDeposits[]>([{total: 0, date: new Date()}]);
  // React.useEffect(() => {
  //   getDeposits().then(setData);
  // }, []);

  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      {/*{data.map((deposit: IDeposits) => (*/}
      {/*  <React.Fragment>*/}
      {/*    <Typography component="p" variant="h4">*/}
      {/*      {deposit.total.toLocaleString("US", {style: "currency", currency: "USD"})}*/}
      {/*    </Typography>*/}
      {/*    <Typography color="textSecondary" className={classes.depositContext}>*/}
      {/*      on {deposit.date.toLocaleDateString("US", options)}*/}
      {/*    </Typography>*/}
      {/*  </React.Fragment>*/}
      {/*))}*/}
      <div>
        <Link color="primary" href="javascript:;">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
