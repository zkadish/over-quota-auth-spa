import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import RegisterUser from './RegisterUser';

import { setUserData } from '../../actions/authn';

// const mapStateToProps = state => {
//   return {
//     user: state.authn.user,
//   }
// };

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUserData }, dispatch);
};

export default connect(null, mapDispatchToProps)(RegisterUser);
