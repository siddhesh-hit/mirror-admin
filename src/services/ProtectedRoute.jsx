import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { decrypt } from "lib/encrypt";
import Loader from "components/common/Loader";
import { getApiById } from "./axios";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    authorized: false,
    userData: null
  });

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        // Reset loading state
        setAuthStatus(prev => ({ ...prev, loading: true }));

        // If not authenticated, immediately set unauthorized
        if (!isAuthenticated) {
          setAuthStatus({
            loading: false,
            authorized: false,
            userData: null
          });
          return;
        }

        // Decrypt and fetch user details
        const userId = decrypt(user);
        if (!userId) {
          setAuthStatus({
            loading: false,
            authorized: false,
            userData: null
          });
          return;
        }

        // Fetch user profile
        const res = await getApiById("user", userId);
        if (!res.data.success) {
          setAuthStatus({
            loading: false,
            authorized: false,
            userData: null
          });
          return;
        }

        // Check role and task permissions
        const userData = res.data.data;
        const roles = ["SuperAdmin", "Admin", "ContentCreator", "Reviewer"];

        const isAuthorized =
          roles.includes(userData.role_taskId.role) &&
          element.access.includes(userData.role_taskId.role) &&
          userData.role_taskId.taskName.includes(element.name);

        setAuthStatus({
          loading: false,
          authorized: isAuthorized,
          userData: userData
        });
      } catch (error) {
        console.error("Authorization check failed", error);
        setAuthStatus({
          loading: false,
          authorized: false,
          userData: null
        });
      }
    };

    checkAuthorization();
  }, [isAuthenticated, user, element, location.pathname]);

  if (authStatus.loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to={"/"} replace />;

  const roles = ["SuperAdmin", "Admin", "ContentCreator", "Reviewer"];

  if (roles.includes(authStatus.userData.role_taskId.role)) {
    if (element.access.includes(authStatus.userData.role_taskId.role) && authStatus.userData.role_taskId.taskName.includes(element.name)) {
      return element.element;
    } else {
      navigate(-1, { replace: true });
      setTimeout(() => {
        alert("User not allowed.");
      }, 100);
    }
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default ProtectedRoute;
