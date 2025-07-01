import { Suspense } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
