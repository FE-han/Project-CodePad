import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SearchReasultPage from "./pages/SearchResultPage";

import { makeStyles } from "@mui/styles";
import DefaultPresetsPage from "./pages/DefaultPresetsPage";
import UserPresetsPage from "./pages/UserPresetsPage";
import MyPresetsPage from "./pages/MyPresetsPage";
import LikePresetsPage from "./pages/LikePresets";
import RTKPage from "./pages/RTKPage";

const AppStyles = makeStyles({
  root: {
    display: "grid",
  },
  contents: {
    height: "calc(100vh - 50px)",
  },
});

function App() {
  const classes = AppStyles();
  return (
    <>
      <div className={classes.root}>
        <Header />

        <div className={classes.contents}>
          <Routes>
            <Route path={"/"} element={<IntroPage />} />
            <Route path={"/search"} element={<SearchReasultPage />} />
            <Route
              path={"/defaultpresets/:presetId"}
              element={<DefaultPresetsPage />}
            />
            <Route path={"/userpresets"} element={<UserPresetsPage />} />
            <Route path={"/mypresets"} element={<MyPresetsPage />} />
            <Route path={"/likepresets"} element={<LikePresetsPage />} />

            {/* ReduxToolkit 예시용 페이지 */}
            <Route path={"/example"} element={<RTKPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
