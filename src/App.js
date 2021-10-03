import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space, Button } from "antd";
import Navbar from "./components/Navbar";
import "./App.css";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Homepage from "./components/Homepage";
import News from "./components/News";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

const App = () => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="app">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="main">
            <Layout className="main-layout">
              <div className="routes">
                <Switch>
                  <Route exact path="/">
                    <Homepage />
                  </Route>
                  <Route exact path="/exchanges">
                    <Exchanges />
                  </Route>
                  <Route exact path="/cryptocurrencies">
                    <Cryptocurrencies />
                  </Route>
                  <Route exact path="/crypto/:coinId">
                    <CryptoDetails />
                  </Route>
                  <Route exact path="/news">
                    <News />
                  </Route>
                </Switch>
              </div>
            </Layout>
            <div className="footer">
              <Typography.Title
                level={5}
                style={{ color: "white", textAlign: "center" }}
              >
                Copyright © 2021 <Link to="/">Crypto App Inc.</Link> <br />
                All Rights Reserved.
              </Typography.Title>
              <Space>
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
              </Space>
              {/* <span className="themeControl" onClick={themeToggler}>
                {theme === "light" ? "Dark" : "Light"}
              </span> */}
            </div>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
