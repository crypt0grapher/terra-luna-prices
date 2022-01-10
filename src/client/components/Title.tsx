import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";

// type Title = PropTypes.InferProps<typeof Title.propTypes>;

export default function Title(props: any) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
