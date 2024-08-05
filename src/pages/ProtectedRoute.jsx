import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/fakeAuthContext"
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/", { replace: true })
        }
    })

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;