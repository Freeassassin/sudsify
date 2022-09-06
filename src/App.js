import { pages } from "./utils/pages";
import { DarkModeProvider } from "./utils/DarkModeProvider";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter, useLocation, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <DarkModeProvider>
        <BrowserRouter>
          <TransitionRoutes />
        </BrowserRouter>
      </DarkModeProvider>
    </div>
  );
}
const TransitionRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <ScrollToTop />
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          {[...pages.main, ...pages.hidden].map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      left: 0,
                      bottom: 0,
                      top: 0,
                    }}
                  >
                    <div style={{ minHeight: "100vh" }}>{page.component}</div>
                  </div>
                }
              />
            );
          })}
          <Route path="*" element={pages["404"].component} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
