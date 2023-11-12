import "./App.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoutes";
import Cashe from "./module/Cashe/components/Cashe";
import Employee from "./module/Employee/components/Employee";
import CancelExpense from "./module/Expense/components/CancelExpense/CancelExpense";
import CreateExpense from "./module/Expense/components/CreateExpense/CreateExpense";
import Expense from "./module/Expense/components/Expense";
import SuccessExpense from "./module/Expense/components/SuccessExpense/SuccessExpense";
import WaitingExpense from "./module/Expense/components/WaitingExpense/WaitingExpense";
import Income from "./module/Income/components/Income";
import Authorization from "./module/RegistrationAndAuthorization/components/Authorization/Authorization";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./module/RegistrationAndAuthorization/components/Registration/Registration";
import ExpenseReports from "./module/Expense/components/ExpenseReports/ExpenseReports";
function App() {
  return (
    <>
      <BrowserRouter>
        <PrivateRoute>
          <Header />
        </PrivateRoute>

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Cashe />
              </PrivateRoute>
            }
          />
          <Route
            path="/income"
            element={
              <PrivateRoute>
                <Income />
              </PrivateRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <PrivateRoute>
                <Expense />
              </PrivateRoute>
            }
          />
          <Route
            path="/createexpense"
            element={
              <PrivateRoute>
                <CreateExpense />
              </PrivateRoute>
            }
          />

          <Route
            path="/waitingexpense"
            element={
              <PrivateRoute>
                <WaitingExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="/successexpense"
            element={
              <PrivateRoute>
                <SuccessExpense />
              </PrivateRoute>
            }
          />

          <Route
            path="/cancelexpense"
            element={
              <PrivateRoute>
                <CancelExpense />
              </PrivateRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <Employee />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Registration />
              </PrivateRoute>
            }
          />
          <Route
            path="/expensereports"
            element={
              <PrivateRoute>
                <ExpenseReports />
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
