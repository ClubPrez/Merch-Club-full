import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  // Vite dev and the noindex tool ship an empty mount node.
  createRoot(root).render(<App />);
}
