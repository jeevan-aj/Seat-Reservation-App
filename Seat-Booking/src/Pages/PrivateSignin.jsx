import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.initialSlice);
  //i should make a isUser field or this will become so messy in future
  const isUserOnly = currentUser;
  return isUserOnly ? <Outlet /> : <Navigate to={"/"} />;
}

export const PrivateSignin = () => {
  const { isCurrentUser } = useSelector((state) => state.initialSlice);

  if (!isCurrentUser) {
    //signin or signout available only if there is no current user
    return <Outlet />;
  }

  // Check the user's role and redirect accordingly
  if (isCurrentUser) {
    return <Navigate to="/book" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
