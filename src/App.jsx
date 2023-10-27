import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./utils/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {routes.map((route, idx) => (
          <Route exact key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
