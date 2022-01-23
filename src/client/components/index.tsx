import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/system";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import React from "react";
import ChartBox from "./Chart";
import TitleBar from "./TitleBar";
import PricesBox from "./PricesBox";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built by "}
      <Link color="inherit" href="https://github.com/crypt0grapher/terra-luna-prices">
        crypt0grapher
      </Link>
      {" in "}
      {new Date().getFullYear()}
      <br />
      {"Powered by "}
      <Link color="inherit" href="https://terra.money">
        Terra
      </Link>
      {", "}
      <Link color="inherit" href="https://docs.mongodb.com/manual/core/timeseries-collections/">
        MongoDB Time Series
      </Link>
      {", "}
      <Link color="inherit" href="https://nestjs.com">
        NestJS
      </Link>
      {", "}
      <Link color="inherit" href="https://nextjs.org">
        Next.js
      </Link>
      {", "}
      <Link color="inherit" href="https://tradingview.com">
        TradingView
      </Link>
      {", and "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
      <br />
      {"Free and open source, Apache 2.0 licensed."}
    </Typography>
  );
}

const useStyles = makeStyles((theme: any) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4)
  },
  content: {
    flexGrow: 1,
    height: "200vh",
    overflow: "auto"
  },
  fixedHeight: {
    height: 500
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: theme.spacing(2)
  },
  root: {
    display: "flex"
  }
}));

const startOfToday = moment().startOf('day').valueOf();
const startOfYesterday = moment().subtract(1, 'day').startOf('day').valueOf();
const startOfWeek = moment().startOf('week').valueOf();
const startOfMonth = moment().startOf('month').valueOf();

export default function Dashboard() {
  const classes = useStyles(useTheme());
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [startDate, setStartDate] = React.useState<number>(startOfToday);
  const [candlePeriod, setCandlePeriod] = React.useState<number>(3600);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="frequency-select-label">Frequency</InputLabel>
                    <Select
                      labelId="frequency-select-label"
                      id="frequency-select"
                      value={candlePeriod}
                      label="Frequency"
                      onChange={e => setCandlePeriod(Number(e.target.value)) }
                    >
                      <MenuItem value={3600}>Hourly</MenuItem>
                      <MenuItem value={86400}>Daily</MenuItem>
                      <MenuItem value={604800}>Weekly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="period-select-label">Period</InputLabel>
                  <Select
                    labelId="period-select-label"
                    id="period-select"
                    value={startDate}
                    label="Period"
                    onChange={e => setStartDate(Number(e.target.value) )}
                  >
                    <MenuItem value={startOfToday}>Today</MenuItem>
                    <MenuItem value={startOfYesterday}>Yesterday</MenuItem>
                    <MenuItem value={startOfWeek}>This week</MenuItem>
                    <MenuItem value={startOfMonth}>This month</MenuItem>
                  </Select>
                </FormControl>
          </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <PricesBox startDate={startDate} period={candlePeriod}/>
                </Paper>
          </Grid>
          </Grid>
        </Container>
        {/*<Container maxWidth="lg" className={classes.container}>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    /!* Chart *!/*/}
        {/*    <Grid item xs={12} md={12} lg={12}>*/}
        {/*      <Paper className={fixedHeightPaper}>*/}
        {/*        <ChartBox swapper={'TerraSwap'} candles={true}/>*/}
        {/*      </Paper>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} md={12} lg={12}>*/}
        {/*      <Paper className={fixedHeightPaper}>*/}
        {/*        <ChartBox swapper={'LOOP'} candles={true}/>*/}
        {/*      </Paper>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} md={12} lg={12}>*/}
        {/*      <Paper className={fixedHeightPaper}>*/}
        {/*        <ChartBox swapper={'Astroport'} candles={true}/>*/}
        {/*      </Paper>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</Container>*/}
        <Copyright />
      </main>
    </div>
  );
}
