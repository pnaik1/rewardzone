import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import { Nomination } from "./components/nomination/Nomination";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nominations/views" element={<Nomination />} />
    </Routes>
  );
};
export default AppRoutes;
