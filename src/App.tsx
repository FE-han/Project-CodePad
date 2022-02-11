import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SearchReasultPage from "./pages/SearchResultPage";

import bg from "./assets/bg.jpg";
import { makeStyles } from "@mui/styles";
import DefaultPresetsPage from "./pages/DefaultPresetsPage";
import UserPresetsPage from "./pages/UserPresetsPage";
import MyPresetsPage from "./pages/MyPresetsPage";
import LikePresetsPage from "./pages/LikePresets";
import RTKPage from "./pages/RTKPage";
import MyPresetsUpdatePage from "./pages/MyPresetsUpdatePage";

const AppStyles = makeStyles({
  root: {
    display: "grid",
    background: `url(${bg})`,
    backgroundPosition: `center center`,
    overflow: "hidden",
  },
});

function App() {
  const classes = AppStyles();
  return (
    <>
      <div className={classes.root}>
        <Header />

        <div>
          <Routes>
            <Route path={"/"} element={<IntroPage />} />
            <Route path={"/search"} element={<SearchReasultPage />} />
            <Route
              path={"/defaultpresets/:presetId"}
              element={<DefaultPresetsPage />}
            />
            <Route
              path={"/userpresets/:userId"}
              element={<UserPresetsPage />}
            />
            <Route path={"/mypresets/:presetId"} element={<MyPresetsPage />} />
            <Route path={"/likepresets"} element={<LikePresetsPage />} />

            <Route
              path={"/mypresets/update"}
              element={<MyPresetsUpdatePage />}
            />
            {/* ReduxToolkit 예시용 페이지 */}
            <Route path={"/example"} element={<RTKPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
