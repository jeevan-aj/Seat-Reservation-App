import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeminarHall from "./Components/SeminarHall";
import { PrivateSignin } from "./Pages/PrivateSignin";
import Signin from "./Pages/SignIn";
import Signup from "./Pages/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* login signup routes */}
          <Route>
            <Route element={<PrivateSignin/>}>
              <Route path="/" element={<Signin/>} />
              <Route path="/signup" element={<Signup/>} />
            </Route>
          </Route>

          {/* other routes after loggedIn */}
          <Route>
            <Route path="/book" element={<SeminarHall/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

