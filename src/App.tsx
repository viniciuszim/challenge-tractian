import React from "react";
import "./App.css";
import { HomePage } from "./pages/Home";
import Header from "./components/Header";
import { CompanyProvider } from "./hooks/useCompanies";

function App() {
  return (
    <CompanyProvider>
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="p-[8px]">
          <HomePage />
        </main>
      </div>
    </CompanyProvider>
  );
}

export default App;
