import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import { Nomination } from "./components/nomination/Nomination";
import CreateNominationPage from "./components/CreateNominationPage/CreateNominationPage";
import FinalCertificatePage from "./components/CreateNominationPage/FinalCertificatePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nominations/views" element={<Nomination />} />
      <Route path="/nominations/create" element={<CreateNominationPage />} />
      <Route path="/nominations/create" element={<CreateNominationPage />} />
      <Route path="/nominations/final" element={<FinalCertificatePage />} />
    </Routes>
  );
};
export default AppRoutes;
