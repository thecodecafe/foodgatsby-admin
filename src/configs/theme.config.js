import { createMuiTheme } from '@material-ui/core/styles';
import RedColor from '@material-ui/core/colors/red';
import YellowColor from '@material-ui/core/colors/yellow';
import GreenColor from '@material-ui/core/colors/green';
// import { lighten } form '@material-ui/core/styles/colorManipulator';

// theme configs
export const theme = createMuiTheme({
    palette: {
        primary: {main: RedColor[600]},
        secondary: {main: YellowColor[600]},
        success: {
            light: GreenColor[100],
            main: GreenColor[600],
            dark: GreenColor[900],
        },
        type: 'light'
    }
});