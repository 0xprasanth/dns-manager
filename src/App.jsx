import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import Router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
        </QueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
