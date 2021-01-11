import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../../styles/theme';
import App from '../App';

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root;
