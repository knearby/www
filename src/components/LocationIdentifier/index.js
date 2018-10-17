import React from 'react';
import uuid from 'uuid/v4';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const locationIdentifierPlaceholderText = 'Where do you want to go today?';

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
          <Typography variant="headline">
            It works!!!
          </Typography>
          <Typography variant="body1">
            Your session UUID is {this.state.uuid}
          </Typography>
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
        </div>
      );
    }

    handleLocationSelect = (place) => {
      console.info(place);
      alert(`You selected ${place.mainText} at ${place.description}`)
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
            });
          });
      }, 500);
    }
  }
);
