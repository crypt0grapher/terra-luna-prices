import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import {useTheme} from '@mui/system';
import { makeStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import React from "react";
import ChartBox from "./Chart";
import TitleBar from "./TitleBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://github.com/crypt0grapher/terra-luna-prices">
        Open source
      </Link>
      {", built in "}
      {new Date().getFullYear()}
        <br/>
      {"Powered by "}
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
    </Typography>
  );
}

const useStyles = makeStyles((theme: any) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  fixedHeight: {
    height: 240,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: theme.spacing(2),
  },
  root: {
    display: "flex",
  },
}));

export default function Dashboard() {
  const classes = useStyles(useTheme());
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <ChartBox swapper={'TerraSwap'} candles={false}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <ChartBox swapper={'LOOP'} candles={false}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <ChartBox swapper={'Astroport'} candles={false}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <ChartBox swapper={'TerraSwap'} candles={true}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <ChartBox swapper={'LOOP'} candles={true}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <ChartBox swapper={'Astroport'} candles={true}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
