import React from "react";
import "./App.css";
import { HomePage } from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="p-4">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
