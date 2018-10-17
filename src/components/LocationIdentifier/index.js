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
                    fullWidth
                    key={place.placeId}
                    onClick={() => this.handleLocationSelect(place)}
                    variant="flat"
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
          {
            this.state.place ? (
              <div>
                <Typography variant="headline">
                  Knearby {this.state.place.name}...
                </Typography>
                <Typography variant="caption">
                  {this.state.place.types.map((type) => {
                    <span key={type}>#{type}</span>
                  })}
                </Typography>
                <Typography variant="caption">
                  Coordinates: {this.state.place.lat}, {this.state.place.lng}
                </Typography>
              </div>
            ) : (
              <div></div>
            )
          }
        </div>
      );
    }

    handleLocationSelect = (place) => {
      console.info(place);
      fetch(`${global.url.api}placeInfo?session=${this.state.uuid}&placeid=${place.placeId}`)
        .then((res) => res.json())
        .then((body) => {
          console.info(body);
          this.setState({
            autocompleteResults: [],
            place: body,
            uuid: uuid(),
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            place: null,
          });
        });
      alert(`You selected ${place.mainText} at ${place.description}`);
    }

    handleOnChange = (e) => {
      const {value} = e.target;
      this.setState({queryText: value});
      if (this.textDebounce) {
        clearTimeout(this.textDebounce);
      }
      this.textDebounce = setTimeout(() => {
        console.info(`triggering request for state ${value} using uuid ${this.state.uuid}`);
        console.info(`api url: ${global.url.api}placeAutocomplete`);
        fetch(`${global.url.api}placeAutocomplete?session=${this.state.uuid}&text=${value}`)
          .then((res) => res.json())
          .then((body) => {
            this.setState({
              autocompleteResults: body,
              place: null,
            });
          })
          .catch((error) => {
            console.error(error);
            this.setState({
              autocompleteResults: [],
              place: null,
            });
          });
      }, 500);
    }
  }
);
