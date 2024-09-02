import React from "react";
import { ToastContainer } from "react-toastify";
import { keepPreviousData, QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import RoutesData from "./services/RoutesData";

export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
      }
    }
  })


  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RoutesData />
    </QueryClientProvider>
  );
}
