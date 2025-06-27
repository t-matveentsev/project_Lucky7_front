import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage/HomePage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}
