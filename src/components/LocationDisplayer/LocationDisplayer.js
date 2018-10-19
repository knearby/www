import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

export default withStyles((theme) => ({}))(({classes, location}) => {
  const available = location ? true : false;
  const name = location ? location.name : '';
  const types = location ? (location.types || []) : [];
  const lat = location ? location.lat : '';
  const lng = location ? location.lng : '';
  return (
    <div id="location-displayer">
      <Fade in={available}>
        <div id="loaded">
          <Typography variant="h4">
            Near {name}?
          </Typography>
          <Typography variant="caption">
            {types.map((type) => {
              <span key={type}>#{type}</span>
            })}
          </Typography>
          <Typography variant="caption">
            Coordinates: {lat}, {lng}
          </Typography>
        </div>
      </Fade>
    </div>
  );
});
