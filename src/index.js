import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { FavoritesContextProvider } from "./store/favorites-context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoritesContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </FavoritesContextProvider>
);
