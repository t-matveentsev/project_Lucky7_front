import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect, Suspense } from 'react';
import Layout from './Layout/Layout.jsx';
import HomePage from '../pages/HomePage/HomePage';
import PrivateRoute from './PrivateRoute';
import { refreshUser } from '../redux/auth/operation.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing, selectError } from '../redux/auth/selectors.js';
import { useNavigate } from 'react-router-dom';

const RecipeViewPage = lazy(() =>
  import('../pages/RecipeViewPage/RecipeViewPage.jsx')
);
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));
const AddRecipePage = lazy(() =>
  import('../pages/AddRecipePage/AddRecipePage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage.jsx')
);
const RegisterPage = lazy(() =>
  import('../pages/RegisterPage/RegisterPage.jsx')
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage.jsx'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const error = useSelector(selectError); 
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (error && error.includes('401')) {
      navigate('/auth/login'); 
      localStorage.removeItem('sessionId'); 
      localStorage.removeItem('refreshToken'); 
    }
  }, [error, navigate]);

  return isRefreshing ? null : (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:recipeId" element={<RecipeViewPage />} />
        <Route
          path="/profile/:recipeType"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/add-recipe"
          element={
            <PrivateRoute>
              <AddRecipePage />
            </PrivateRoute>
          }
        />
      </Routes>
      </Suspense>
    </Layout>
  );
}
