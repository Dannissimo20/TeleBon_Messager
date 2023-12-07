import React, { useState } from "react";
import "./App.css";

import "./assets/fonts.js";
import "./styles/normalize.css";
import "./styles/global.css";
import { Outlet } from "react-router-dom";
import InnerLayout from "./components/layouts/InnerLayout";
import CommonModal from "./components/shared/modal/CommonModal";
import CommonSidebar from "./components/shared/modal/CommonSidebar";

function App() {
  const [currentTheme, setTheme] = useState("default");
  const toggleTheme = (name: "default" | "dark") => {
    setTheme(name);
  };

  return (
    <div className="App">
      <InnerLayout toggleTheme={toggleTheme} currentTheme={currentTheme}>
        <Outlet />
      </InnerLayout>
      <CommonModal />
      <CommonSidebar />
    </div>
  );
}

export default App;
