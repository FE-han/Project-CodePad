import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SearchReasultPage from "./pages/SearchResultPage";

import { makeStyles } from "@mui/styles";

const AppStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "50px auto",
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
            <Route path={"/intro"} element={<IntroPage />} />
            <Route path={"/search"} element={<SearchReasultPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
