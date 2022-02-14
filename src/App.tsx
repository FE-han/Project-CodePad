import React from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SearchReasultPage from "./pages/SearchResultPage";

import bg from "./assets/bg.jpg";
import { makeStyles } from "@mui/styles";
import DefaultPresetsPage from "./pages/DefaultPresetsPage";
import UserPresetsPage from "./pages/UserPresetsPage";
import MyPresetsPage from "./pages/MyPresetsPage";
import LikePresetsPage from "./pages/LikePresets";

import CreatePresetsPage from "./pages/CreatePresetsPage";
import ModifyPresetsPage from "./pages/UpdatePresetsPage";

import RTKPage from "./pages/RTKPage";

const AppStyles = makeStyles({
  root: {
    minWidth: "1200px",
    height: "100vh",
    overflow: "auto",
    background: `url(${bg}) no-repeat center center`,
    backgroundSize: `100% 100%`,
  },
});

function App() {
  const classes = AppStyles();
  return (
    <>
      <div className={classes.root}>
        <Header />

        <Routes>
          <Route path={"/"} element={<IntroPage />} />
          <Route path={"/search"} element={<SearchReasultPage />} />
          <Route
            path={"/defaultpresets/:presetId"}
            element={<DefaultPresetsPage />}
          />
          <Route path={"/userpresets/:userId"} element={<UserPresetsPage />} />
          <Route path={"/mypresets/:presetId"} element={<MyPresetsPage />} />
          <Route path={"/likepresets"} element={<LikePresetsPage />} />

          <Route path={"/mypresets/create"} element={<CreatePresetsPage />} />
          <Route path={"/mypresets/update"} element={<ModifyPresetsPage />} />

          {/* ReduxToolkit 예시용 페이지 */}
          <Route path={"/example"} element={<RTKPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
