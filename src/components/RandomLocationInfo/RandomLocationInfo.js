import React from 'react';
import Case from 'case';

import {withStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export default withStyles((theme) => ({}))(
  ({classes, data}) => (
    <div id="random-location-info">
      {
        data ? (
          <div id="loaded">
            <Typography variant="caption">
              You should head over to...
            </Typography>
            <Typography variant="h3">
              <strong>{data.name}</strong>
            </Typography>
            <Typography variant="h5">
              {data.address}
            </Typography>
            <Typography variant="caption">
            {
              data.tags.map((tag) => (
                <span key={tag}>#{Case.lower(Case.kebab(tag))}, </span>
              ))
            }
            </Typography>
          </div>
        ) : (
          <div id="unloaded"></div>
        )
      }
    </div>
  )
)