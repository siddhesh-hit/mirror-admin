import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { decrypt } from "lib/encrypt";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to={"/"} replace />;

  const deData = user ? JSON.parse(decrypt(user)) : null;

  const roles = ["SuperAdmin", "Admin", "ContentCreator", "Reviewer"];

  if (roles.includes(deData.role_taskId.role)) {
    if (
      element.access.includes(deData.role_taskId.role) &&
      deData.role_taskId.taskName.includes(element.name)
    ) {
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
