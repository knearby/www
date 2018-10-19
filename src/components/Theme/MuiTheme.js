import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import orange from '@material-ui/core/colors/orange';
import deepPurple from '@material-ui/core/colors/deepPurple';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: deepPurple,
    secondary: orange,
  },
})
