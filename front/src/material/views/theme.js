import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {lightBlue600} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
      textColor: lightBlue600,
    },
    appBar: {
      background: lightBlue600,
      height: 50,
    },
  });

export default muiTheme