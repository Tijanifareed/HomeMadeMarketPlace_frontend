import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home" 
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import UserProfile from "../pages/UserProfile";

const router = createBrowserRouter([
     {
          path: "/",
          element: <App/>,
          children: [
               {
                    path: "",
                    element: <Home/>
               },
               {
                    path: "login",
                    element: <LoginPage/>
               },
               {
                    path:"signup",
                    element: <SignUpPage/>
               },
               {
                    path: "profile",
                    element: <UserProfile/>
               }
     ]
     }
]);

export default router;