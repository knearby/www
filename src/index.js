import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LocationIdentifier from './components/LocationIdentifier';

const textFieldPlaceholder = 'where are you?';

export default withStyles((theme) => ({}))(
  ({classes}) => (
    <div id="application">
      <CssBaseline />
      <Grid container>
        <Grid item sm={2} />
        <Grid item sm={8}>
          <LocationIdentifier />
        </Grid>
        <Grid item sm={2} />
      </Grid>
    </div>
  )
);
