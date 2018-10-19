import React from 'react';
import uuid from 'uuid/v4';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const locationIdentifierPlaceholderText = 'Where are you?';

export default withStyles((theme) => ({}))(
  class LocationIdentifier extends React.Component {
    constructor() {
      super();
      this.textDebounce = null;
      this.state = {
        autocompleteResults: [],
        queryText: '',
      };
    }

    componentDidMount() {
      this.setState({uuid: uuid()});
    }

    render() {
      return (
        <div id="location-identifier">
          <TextField
            fullWidth
            onChange={this.handleOnChange}
            placeholder={locationIdentifierPlaceholderText}
            value={this.state.queryText}
          />
          {
            this.state.autocompleteResults ? (
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
            ) : (
              <div></div>
            )
          }
        </div>
      );
    }

    handleLocationSelect = (selectedPlace) => {
      this.setState({
        autocompleteResults: [],
        queryText: selectedPlace.mainText,
        loading: true,
      });
      fetch(`${global.url.api}placeInfo?session=${this.state.uuid}&placeid=${selectedPlace.placeId}`)
        .then((res) => res.json())
        .then((placeInfo) => {
          console.info('%c🏷 placeInfo', 'font-weight: 800;');
          console.info(placeInfo);
          this.setState({
            autocompleteResults: [],
            loading: false,
            place: placeInfo,
            uuid: uuid(),
          });
          if (typeof this.props.onLocationChange === 'function') {
            this.props.onLocationChange(placeInfo)
          }
        })
        .catch((error) => {
          console.error('%c🔥🔥🔥 placeInfo', 'font-weight: 800;');
          console.error(error);
          this.setState({
            loading: false,
            place: null,
          });
        });
    }

    handleOnChange = (e) => {
      const {value} = e.target;
      this.setState({queryText: value});
      if (this.textDebounce) {
        clearTimeout(this.textDebounce);
      }
      this.textDebounce = setTimeout(() => {
        console.info(`[${global.url.api}placeAutocomplete] request uuid: ${this.state.uuid}`);
        if (value.length > 0) {
          fetch(`${global.url.api}placeAutocomplete?session=${this.state.uuid}&text=${value}`)
            .then((res) => res.json())
            .then((autocompleteResults) => {
              console.info('%c🏷 placeAutocomplete', 'font-weight: 800;');
              console.info(autocompleteResults);
              this.setState({
                autocompleteResults,
                place: null,
              });
            })
            .catch((error) => {
              console.error('%c🔥🔥🔥 placeAutocomplete', 'font-weight: 800;');
              console.error(error);
              this.setState({
                autocompleteResults: [],
                place: null,
              });
            });
        } else {
          this.setState({
            autocompleteResults: [],
          });
        }
      }, 500);
    }
  }
);
