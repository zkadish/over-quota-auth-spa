import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from './Login';

import { setUserData } from '../../actions/authn';

const mapStateToProps = state => {
  return {
    user: state.authn.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUserData }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);