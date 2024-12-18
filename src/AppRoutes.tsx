import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import { Nomination } from "./components/nomination/Nomination";
import CreateNominationPage from "./components/CreateNominationPage/CreateNominationPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nominations/views" element={<Nomination />} />
      <Route path="/nominations/create" element={<CreateNominationPage />} />
    </Routes>
  );
};
export default AppRoutes;
