import "./index.css";
import AppLayout from "./layout/AppLayout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardHome from "./pages/DashboardHome";
import NewTransactionPage from "./pages/NewTransactionPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Empty } from "antd";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen">
        <Router>
          <Routes>
            <Route path="" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<AppLayout />}>
              <Route path="" element={<DashboardHome />} />
              <Route path="new-transaction" element={<NewTransactionPage />} />
            </Route>
            <Route
              path="*"
              element={
                <AppLayout>
                  <div className="w-full h-full flex items-center justify-center">
                    <Empty description="You have found the ends of the earth!" />
                  </div>
                </AppLayout>
              }
            />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
