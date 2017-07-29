import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import { actions as AuthActions } from '../ducks/auth';

function mapStateToProps(state) {
  const newState = state.authReducer;
  return {
    user: newState.user,
    isAuth: !!newState.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
