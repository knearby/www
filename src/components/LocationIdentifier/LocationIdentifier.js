import React from 'react';
import uuid from 'uuid/v4';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const locationIdentifierPlaceholderText = 'Where are you?';

export default withStyles((theme) => ({}))(
  class LocationIdentifier extends React.Component {
    state = {
      autocompleteResults: [],
      autocompleteResultsLoaded: false,
      autocompleteResultsLoading: false,
      locationLoading: false,
      queryText: '',
    }

    constructor() {
      super();
      this.textDebounce = null;
    }

    componentDidMount() {
      this.setState({uuid: uuid()});
    }

    render() {
      return (
        <div id="location-identifier">
          <Fade
            in={this.state.autocompleteResultsLoading}
          >
            <div style={{
              position: 'static',
              textAlign: 'center',
              width: '100%',
            }}>
              <CircularProgress />
            </div>
          </Fade>
          <TextField
            disabled={this.state.locationLoading}
            fullWidth
            onKeyDown={this.handleOnKeyDown}
            onChange={this.handleOnChange}
            placeholder={locationIdentifierPlaceholderText}
            value={this.state.queryText}
          />
          <Fade in={this.state.locationLoading === true}>
            <LinearProgress
              style={{
                height: '2px',
              }}
            />
          </Fade>
          <Fade
            in={this.state.autocompleteResultsLoaded}
          >
          {
            <div>
              {this.state.autocompleteResults.map((place) => (
                <Button
                  color="primary"
                  fullWidth
                  key={place.placeId}
                  onClick={() => this.handleLocationSelect(place)}
                  variant="text"
                >
                  <div style={{
                    textAlign: 'left',
                    width: '100%',
                  }}>
                    <Typography variant="subheading">
                      {place.mainText}
                    </Typography>
                    <Typography variant="caption">
                      {place.description}
                    </Typography>
                  </div>
                </Button>
              ))}
            </div>
          }
          </Fade>
        </div>
      );
    }

    handleLocationSelect = (selectedPlace) => {
      this.setState({
        autocompleteResultsLoaded: false,
        locationLoading: true,
        queryText: selectedPlace.mainText,
        loading: true,
      });
      if (ga) { // for google analytics
        ga('send', {
          hitType: 'event',
          eventCategory: 'i-am-at',
          eventLabel: selectedPlace.mainText,
        });
      }
      if (typeof this.props.onLocationLoading === 'function') {
        this.props.onLocationLoading();
      }
      fetch(`${global.url.api}placeInfo?session=${this.state.uuid}&placeid=${selectedPlace.placeId}`)
        .then((res) => res.json())
        .then((placeInfo) => {
          console.info('%c🏷 placeInfo', 'font-weight: 800;');
          console.info(placeInfo);
          this.setState({
            autocompleteResults: [],
            place: placeInfo,
            uuid: uuid(),
          });
          if (typeof this.props.onLocationChange === 'function') {
            this.props.onLocationChange(placeInfo);
          }
        })
        .catch((error) => {
          console.error('%c🔥🔥🔥 placeInfo', 'font-weight: 800;');
          console.error(error);
          this.setState({
            place: null,
          });
        })
        .then(() => {
          this.setState({locationLoading: false});
        });
    }

    handleOnChange = (e) => {
      const {value} = e.target;
      this.setState({
        queryText: value,
        autocompleteResultsLoading: true,
      });
      if (this.textDebounce) {
        clearTimeout(this.textDebounce);
      }
      this.textDebounce = setTimeout(() => {
        console.info(`[${global.url.api}placeAutocomplete] request uuid: ${this.state.uuid}`);
        if (value.length > 0) {
          this.currentQuery = 
            fetch(`${global.url.api}placeAutocomplete?session=${this.state.uuid}&text=${value}`)
              .then((res) => res.json())
              .then((autocompleteResults) => {
                console.info('%c🏷 placeAutocomplete', 'font-weight: 800;');
                console.info(autocompleteResults);
                this.setState({
                  autocompleteResults,
                  autocompleteResultsLoaded: true,
                });
              })
              .catch((error) => {
                console.error('%c🔥🔥🔥 placeAutocomplete', 'font-weight: 800;');
                console.error(error);
                this.setState({
                  autocompleteResults: [],
                  autocompleteResultsLoaded: false,
                });
              })
              .then(() => {
                this.setState({
                  autocompleteResultsLoading: false,
                  place: null,
                });
              })
        } else {
          this.setState({
            autocompleteResults: [],
          });
        }
      }, 500);
    }

    handleOnKeyDown = (e) => {
      if (e.keyCode === 13) {
        e.target.blur();
      }
    }
  }
);
