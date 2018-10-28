import React from 'react';
import Case from 'case';

import Fade from '@material-ui/core/Fade';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export default withStyles((theme) => ({}))(
  ({classes, data}) => {
    const available = data !== null;
    const name = data ? data.name : '';
    const address = data ? data.address : '';
    const tags = data ? (data.tags || []) : [];

    return (
      <div id="random-location-info">
        <Fade in={available}>
          <div id="loaded">
            {
              available ? (
                <Typography variant="caption">
                  You should head over to...
                </Typography>
              ) : ''
            }
            <Typography variant="h3">
              <strong>{name}</strong>
            </Typography>
            <Typography variant="h5">
              {address}
            </Typography>
            <Typography variant="caption">
            {
              tags.map((tag) => (
                <span key={tag}>#{Case.lower(Case.kebab(tag))}, </span>
              ))
            }
            </Typography>
          </div>
        </Fade>
      </div>
    );
  }
)