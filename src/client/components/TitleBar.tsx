import AppBar from "@mui/material/AppBar";
import { makeStyles} from "@mui/styles";
import {useTheme} from '@mui/system';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import React from "react";
import { Avatar } from "@mui/material";
const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  appBar: {
    backgroundColor: "darkblue",
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  drawerPaper: {
    position: "relative",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: "nowrap",
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  fixedHeight: {
    height: 240,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
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
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

export default function TitleBar() {
  const classes = useStyles(useTheme());
  return (
    <React.Fragment>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Avatar sx={{ m: 1 }} alt="Bonded Luna" src="https://whitelist.anchorprotocol.com/logo/bLUNA.png" />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          bLuna price monitoring on Terra blockchain
          </Typography>
        </Toolbar>
      </AppBar  >
    </React.Fragment>
  );
}
