import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InventoryApp from "./pages/InventoryApp";
import LoginPage from "./pages/LoginPage";
import Test from "./pages/Test";
import Error from "./pages/Error"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authSlice, getItems } from "./features/authSlice";
import Profile from "./pages/InventoryApp/Profile";
import About from "./pages/InventoryApp/About"; 
import Categories from "./pages/InventoryApp/Categories";
import Inventory from "./pages/InventoryApp/Inventory";
import Dashboard from "./components/Dashboard";
import AIChat from "./pages/InventoryApp/AIChat";
import Products from "./pages/Products";
import UserDashboard from "./components/UserDashboard";
/*
{
              user: JSON.parse(localStorage.getItem('user')),
              isAuthenticated: localStorage.getItem('isAuthenticated'),
              access_token: localStorage.getItem('access_token'),
              expireAt: localStorage.getItem('expireAt'),
            }

*/

/**
      (()=>{
        const param = {
          user: {},
          isAuthenticated: false,
          access_token: null,
          expireAt: null,
        }
        try{
          if(new Date(localStorage.getItem('expireAt')) < new Date()){
            param.isAuthenticated = true;
            return param;
          }else{
            param.user = JSON.parse(localStorage.getItem('user'));
            param.access_token = localStorage.getItem('access_token');
            param.expireAt = localStorage.getItem('expireAt');
            param.isAuthenticated = localStorage.getItem('isAuthenticated');
            return param;
          }
        }catch(e){
          return param;
        }
      })()
 */

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  useEffect((()=>{
    console.log("Initiating preflight")
    dispatch(authSlice.actions.preflight());
    dispatch(getItems());
  }),[dispatch]);

  
  return (
    <>
    <Routes style = {{filter: "invert(100%)"}}>
      <Route path = "/" element={<LandingPage/>}></Route>
      <Route path = "/oauth" element={<InventoryApp/>}>
        <Route path = ":access_token" element={<div>accesstoken</div>}></Route>
      </Route>
      <Route path = "/auth" element={<LoginPage/>}></Route>
      <Route path = "/contact-me" element={<About/>}></Route>
      <Route path = "/stats" element = {<Dashboard type = "user"/>}></Route>
      <Route path = "/app" element={(()=>{
        if(user.isAuthenticated){
          return (<InventoryApp/>)
        }else{
          return (<Error errorcode = {"Not Authenticated or JWT is expired"}/>)
        }
      })()}>
        <Route path = "profile" element = {<Profile/>}></Route>
        <Route path = "about" element = {<About/>}>
          <Route path = ":id" element = {<About/>}></Route>
        </Route>
        <Route path = "category" element = {<Categories/>}></Route>
        <Route path = "inventory" element = {<Inventory/>}></Route>
        <Route path = "dashboard" element = {<div style = {{height: "100%"}}><Dashboard type = "user" style = {{width: "100%", height: "100%"}}/><UserDashboard type = "user"></UserDashboard></div>}></Route>
        <Route path = "chat" element = {<AIChat/>}></Route>
        <Route path = ":id" element = {<div>new element</div>}></Route>
      </Route>
      <Route path = "/test" element = {<Test/>}></Route>
      <Route path = "/error" element = {<Error/>}>
        <Route path = ":error" element = {<Error/>}></Route>
      </Route>
      <Route path = "/products" element = {<Products/>}>
        <Route path = ":user"></Route>
      </Route>
      <Route path = "/*" element = {<Error errorcode={"Invalid Path"} redirectLink={"/"} redirectLinkText={"Landing page"}/>}></Route>
    </Routes>
    </>
  )
}

export default App
