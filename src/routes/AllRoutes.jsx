import Mockman from "mockman-js";
import { Routes, Route} from "react-router-dom";

const AllRoutes = () => {
  return (
          <Routes>
            <Route path="/" element={<div>Homepage</div>} />
            <Route path="/mockman" element={<Mockman />} />
          </Routes>
  );
};

export { AllRoutes };