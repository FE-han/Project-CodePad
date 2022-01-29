import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header />
          </Grid>

          <Grid item xs={12}>
            <Routes>
              <Route path={"/"} element={<IntroPage />} />
              <Route path={"/intro"} element={<IntroPage />} />
            </Routes>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
