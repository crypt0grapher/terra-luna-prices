import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/system";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import moment from "moment";
import TitleBar from "./TitleBar";
import PricesBox from "./PricesBox";
import { FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Copyright } from "./Copyright";

enum Seconds {
  in1Min = 60,
  in30Min = 1800,
  in1Hour = 3600,
  in1Day = 86400,
  in1Week = 604800,
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

const startOfToday = moment().startOf("day").valueOf();
const startOfYesterday = moment().subtract(1, "day").startOf("day").valueOf();
const startOfWeek = moment().startOf("week").valueOf();
const startOfMonth = moment().startOf("month").valueOf();

export default function Dashboard() {
  const classes = useStyles(useTheme());
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [startDate, setStartDate] = React.useState<number>(startOfToday);
  const [candlePeriod, setCandlePeriod] = React.useState<number>(Seconds.in1Hour);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            {/* Chart */}
            <Grid item xs={12} md={6} style={{ display: "flex"}} justifyContent={{xs:"center",md: "left" }}>
              <ToggleButtonGroup
                color="primary"
                value={candlePeriod}
                onChange={(event,value) => setCandlePeriod(Number(value))}
                exclusive
              >
                <ToggleButton value={Seconds.in1Hour}>Hourly</ToggleButton>
                <ToggleButton value={Seconds.in1Day}>Daily</ToggleButton>
                <ToggleButton value={Seconds.in1Week}>Weekly</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} md={6} style={{ display: "flex" }}  justifyContent={{xs:"center",md: "right" }}>
              <ToggleButtonGroup
                color="primary"
                value={startDate}
                onChange={(event,value) => setStartDate(Number(value))}
                exclusive
              >
                <ToggleButton value={startOfToday}>Today</ToggleButton>
                <ToggleButton value={startOfYesterday}>Since Yesterday</ToggleButton>
                <ToggleButton value={startOfWeek}>This Week</ToggleButton>
                <ToggleButton value={startOfMonth}>This Month</ToggleButton>
              </ToggleButtonGroup>

            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <PricesBox startDate={startDate} period={candlePeriod} />
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
