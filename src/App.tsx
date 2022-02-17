import React from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SearchReasultPage from "./pages/SearchResultPage";
// import NewMypresetsPage from "./pages/NewMypresetsPage";
import bg from "./assets/bg.jpg";
import { makeStyles } from "@mui/styles";
import DefaultPresetsPage from "./pages/DefaultPresetsPage";
import UserPresetsPage from "./pages/UserPresetsPage";
import MyPresetsPage from "./pages/MyPresetsPage";
import LikePresetsPage from "./pages/LikePresets";

import CreatePresetsPage from "./pages/CreatePresetsPage";
import ModifyPresetsPage from "./pages/UpdatePresetsPage";
import HandleMyPresetPage from "./pages/HandleMyPresetPage";

const AppStyles = makeStyles({
  root: {
    minWidth: "1041px",
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
          <Route path={"/search/:keyword"} element={<SearchReasultPage />} />
          <Route
            path={"/defaultpresets/:presetId"}
            element={<DefaultPresetsPage />}
          />

          <Route
            path={"/userpresets/:userId/:presetId"}
            element={<UserPresetsPage />}
          />

          <Route path={"/mypresets/:presetId"} element={<MyPresetsPage />} />
          <Route path={"/mypresets/create"} element={<HandleMyPresetPage />} />
          <Route
            path={"/mypresets/update/:presetId"}
            element={<HandleMyPresetPage />}
          />

          <Route path={"/likepresets"} element={<LikePresetsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
