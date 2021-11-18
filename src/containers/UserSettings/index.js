import { connect } from 'react-redux';
import UserSettings from './UserSettings.jsx';

const mapStateToProps = state => ({
  user: state.authn.user,
});

export default connect(mapStateToProps)(UserSettings);
