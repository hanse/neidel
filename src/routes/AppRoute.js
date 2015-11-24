import { connect } from 'react-redux';
import App from '../components/App';

export default connect((state) => ({
  hasToken: state.auth.get('token') !== null
}))(App);
