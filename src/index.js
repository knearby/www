import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import LocationIdentifier from './components/LocationIdentifier';
import Theme from './components/Theme/MuiTheme';

export default withStyles((theme) => ({
  centerpiece: {
    flexGrow: 1,
  },
}))(
  ({classes}) => (
    <MuiThemeProvider theme={Theme}>
      <div id="application">
        <CssBaseline />
        <Grid container style={{
          height: '100%',
        }}>
          <Grid item xs={false} sm={2} />
          <Grid className={classes.centerpiece} item xs={12} sm={8}>
            <LocationIdentifier />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </div>
    </MuiThemeProvider>
  )
);
