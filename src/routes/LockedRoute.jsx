import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const LockedRoute = ({children}) => {
    const { token } = useSelector(state => state.auth);

    return token ? children : <Navigate to="/" />;
}