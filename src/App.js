// src/App.js
import React from "react";
import GitHubFetcher from "./components/GitHubFetcher";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1 className="dashboard-title">🚀 GitHub Project Explorer</h1>
        <p className="dashboard-subtitle">Discover. Analyze. Bookmark GitHub repositories effortlessly.</p>
      </header>

      <main className="dashboard-main dashboard-no-sidebar">
        <div className="dashboard-content">
          <GitHubFetcher />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
