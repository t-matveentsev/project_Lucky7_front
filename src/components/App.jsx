import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './Layout';
import HomePage from '../pages/HomePage/HomePage';
import PrivateRoute from './PrivateRoute';

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
      </Routes>
    </Layout>
  );
}
