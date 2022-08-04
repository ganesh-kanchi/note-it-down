import { Login } from "features/auth";
import Mockman from "mockman-js";
import { HomePage } from "pages";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate} from "react-router-dom";
import { LockedRoute } from "./LockedRoute";

const AllRoutes = () => {
  const {token} = useSelector(state=> state.auth)
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={ !token ? <Login /> : <Navigate to="home" replace />} />
      
        <Route path="home" element={<LockedRoute> <HomePage /> </LockedRoute>} />

        <Route path="mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
};

export { AllRoutes };