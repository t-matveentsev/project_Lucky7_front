import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './Layout';
import HomePage from '../pages/HomePage/HomePage';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import RecipeViewPage from '../pages/RecipeViewPage/RecipeViewPage.jsx';
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx';
import LoginPage from '../pages/LoginPage/LoginPage.jsx';

import { refreshThunk } from '../redux/auth/operation';
import { selectIsRefreshing } from '../redux/auth/selectors';

const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));
const AddRecipePage = lazy(() =>
  import('../pages/AddRecipePage/AddRecipePage.jsx')
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  if (isRefreshing) {
    return <p>Refreshing session...</p>;
  }

  return (
    <Layout>
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
        <Route path="/add-recipe" element={<AddRecipePage />} />
      </Routes>
    </Layout>
  );
}
