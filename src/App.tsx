import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width={200} />
      </header>
      <HomePage />
    </div>
  );
}

export default App;
