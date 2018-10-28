import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import Theme from './components/Theme/MuiTheme';
import LocationIdentifier from './components/LocationIdentifier';
import LocationDisplayer from './components/LocationDisplayer';
import RandomLocationInfo from './components/RandomLocationInfo';

import logo from './assets/logo.light.png';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

export default withStyles((theme) => ({
  centerpiece: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '128px',
  }
}))(class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      randomPlace: null,
    };
  }

  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <div id="application">
          <CssBaseline />
          <Grid container style={{
            height: '100%',
          }}>
            <Grid item xs={false} sm={1} md={2} />
            <Grid className={this.props.classes.centerpiece} item xs={12} sm={10} md={8}>
              <br />
              <div className={this.props.classes.logo} />
              <br />
              <LocationIdentifier
                onLocationChange={this.onLocationChange}
              />
              <br />
              <LocationDisplayer location={this.state.location} />
              <br />
              <Fade in={this.state.locationLoading}>
                <div style={{
                  textAlign: 'center',
                  height: '0px',
                  width: '100%',
                }}>
                  <CircularProgress />
                </div>
              </Fade>
              <RandomLocationInfo data={this.state.randomPlace} />
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }

  onLocationChange = (location) => {
    this.setState({
      location,
      locationLoading: true,
    });
    fetch(`${global.url.api}placeRandom?lat=${location.lat}&lng=${location.lng}&rad=500&text=cafe`)
      .then((res) => res.json())
      .then((randomPlace) => {
        console.info('%c🏷 placerandom', 'font-weight: 800;');
        console.info(randomPlace);
        this.setState({
          randomPlace,
        });
      })
      .catch((error) => {
        console.error('%c🔥🔥🔥 placeRandom', 'font-weight: 800;');
        console.error(error);
        this.setState({
          randomPlace: null,
        });
      })
      .then(() => {
        this.setState({locationLoading: false});
      });
  }

  onLocationLoading = () => {
    this.setState({
      location: null,
      randomPlace: null,
    });
  }
});
