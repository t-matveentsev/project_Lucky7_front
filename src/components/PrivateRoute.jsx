import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isLoggedIn) {
    return children;
  }

  if (isRefreshing) {
    return null; // або <Loader />
  }

  const hasSession = Boolean(
    localStorage.getItem('sessionId') && localStorage.getItem('refreshToken')
  );
  if (hasSession) {
    return null;
  }
  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
