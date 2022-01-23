import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Copyright = () =>
  <Typography variant="body2" color="textSecondary" align="center">
    {"Built by crypt"}0&#x0337;{"grapher"}
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
    {"Free and open source"}
    <br />
    <Link color="inherit" href="https://github.com/crypt0grapher/terra-luna-prices">
      <GitHubIcon />
    </Link>
  </Typography>;
