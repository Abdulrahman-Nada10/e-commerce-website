"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../store/store";
import ReactQueryProvider from "../../providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactQueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ReactQueryProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
