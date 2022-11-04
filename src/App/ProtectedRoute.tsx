import { connect } from 'react-redux';
import { Outlet } from 'react-router';
import Loader from '../components/loader';
import { RootState } from '../redux/reducer';
import { userIsAuthSelector, userLoadingSelector } from '../redux/selectors/user';

type StateProps = {
  isAuth: boolean;
  loading: boolean;
};

type OwnProps = {
  children?: JSX.Element;
};

type Props = OwnProps & StateProps;

const ProtectedRoute = ({ children, isAuth, loading }: Props) => {
  if (loading) return <Loader />;
  if (!isAuth) return <div style={{ marginTop: '100px' }}>Войдите</div>;

  return <Outlet />;
};

const mapStateToProps = (state: RootState) => ({
  isAuth: userIsAuthSelector(state),
  loading: userLoadingSelector(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
