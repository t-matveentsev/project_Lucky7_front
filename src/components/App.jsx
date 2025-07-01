import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './Layout';
import HomePage from '../pages/HomePage/HomePage';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx'

const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile/:recipeType"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/not-found" element={<NotFoundPage/>}/>
        <Route path="/auth/register" element={<RegisterPage/>}/>
      </Routes>
    </Layout>
  );
}
