import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { Toaster, toast } from "sonner";
import Router from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
        <Toaster />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
