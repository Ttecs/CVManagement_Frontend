import React, { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import CustomLinearLoader from "./components/CustomLinearLoading/CustomLinearLoader";
//import AddCandidate from "./pages/candidates/AddCandidate";

const Home = lazy(() => import("./pages/Home/Home"));
const Companies = lazy(() => import("./pages/companies/Companies"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const AddJob = lazy(() => import("./pages/Jobs/AddJob"));
const Candidate = lazy(() => import("./pages/candidates/Candidates"));
const AddCandidate = lazy(() => import("./pages/candidates/AddCandidate"));

function App() {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <NavBar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany />} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path="add" element={<AddJob />} />
            </Route>
            <Route path="/candidates">
              <Route index element={<Candidate />} />
              <Route path="add" element={<AddCandidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
