import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
