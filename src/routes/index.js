import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home" 
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

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
               }
     ]
     }
]);

export default router;