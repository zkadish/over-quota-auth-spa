import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../../styles/theme';
import Routes from '../Routes';

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
      {/* </ConnectedRouter> */}
    </Provider>
  )
}

export default Root;
