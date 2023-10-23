import "./App.css";
import PrivateRoute from "./components/PrivateRoutes";
import Cashe from "./module/Cashe/components/Cashe";
import Authorization from "./module/RegistrationAndAuthorization/components/Authorization/Authorization";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Cashe />
              </PrivateRoute>
            }
          />
          <Route path="/auth/login" element={<Authorization />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
