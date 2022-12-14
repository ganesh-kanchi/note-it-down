import React from "react";
import {createRoot} from 'react-dom/client'
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import store from "app/store";
import { NotesProvider } from "contexts/notesContext";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <NotesProvider>
          <App />
        </NotesProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
