import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home" 
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import UserProfile from "../pages/UserProfile";
import SellerApplication from "../pages/SellerApplication";
import LandingPage from "../pages/LandingPage";
import AdmincreateAccount from "../pages/adminpages/admincreateAccount";
import AdminDashboard from "../pages/adminpages/admindashboard";
import SellerApplicants from "../pages/adminpages/SellerApplicants"

const router = createBrowserRouter([
     {
          path: "/",
          element: <App/>,
          children: [
               {
                    path: "",
                    element: <LandingPage/>
               },
               {
                    path: "/home",
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
               },
               {
                    path:"Apply-Today",
                    element: <SellerApplication/>
               },
               
               {
                    path: "adminsignuppage",
                    element: <AdmincreateAccount/>  // This route is for admin signup only.
               },
               {
                    path: "admin-dashboard",
                    element: <AdminDashboard/>
               },
               {
                    path: "admin/applications",
                    element: <SellerApplicants/>
               }
     ]
     }
]);

export default router;