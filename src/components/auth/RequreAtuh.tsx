import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const user: { email: string | null; userId: string | null } = useAppSelector(
    (state) => state.user.user
  );
  const location = useLocation();

  //   if (lodaing) {
  //     return <Loading></Loading>;
  //   }

  if (!user.userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
