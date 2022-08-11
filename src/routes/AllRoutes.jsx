import { NavBar, SideBar } from "components";
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
      {!token ? <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mockman" element={<Mockman />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div> :
      (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            <section className="flex-grow grid grid-cols-[12rem_1fr] text-black">
                <SideBar />
                <Routes>
                  <Route path="/" element={<LockedRoute><HomePage /></LockedRoute>} />
                </Routes>
            </section>
        </div>
      )
      }
    </div>
  );
};

export { AllRoutes };