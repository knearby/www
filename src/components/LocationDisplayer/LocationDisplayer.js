import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default withStyles((theme) => ({}))(({classes, location}) =>
  location ? (
    <div id="location-displayer">
      <Typography variant="h4">
        Near {location.name}?
      </Typography>
      <Typography variant="caption">
        {location.types.map((type) => {
          <span key={type}>#{type}</span>
        })}
      </Typography>
      <Typography variant="caption">
        Coordinates: {location.lat}, {location.lng}
      </Typography>
    </div>
  ) : (
    <span />
  )
);
