import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

import { setUserData } from '../../../actions/authn';

const mapStateToProps = state => {
  return {
    user: state.authn.user,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUserData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppLayout));
