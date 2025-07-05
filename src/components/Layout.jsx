import { Suspense } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
      <Footer />
    </>
  );
};

export default Layout;
