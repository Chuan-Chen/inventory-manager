import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InventoryApp from "./pages/InventoryApp";
import LoginPage from "./pages/LoginPage";
import Test from "./pages/Test";
import Error from "./pages/Error"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authSlice } from "./features/authSlice";

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

  useEffect((()=>{
    console.log("Initiating preflight")
    dispatch(authSlice.actions.preflight());
  }),[]);

  
  return (
    <>
    <Routes>
      <Route path = "/" element={<LandingPage/>}></Route>
      <Route path = "/oauth" element={<InventoryApp/>}>
        <Route path = ":access_token" element={<div>accesstoken</div>}></Route>
      </Route>
      <Route path = "/auth" element={<LoginPage/>}></Route>
      <Route path = "/app" element={<InventoryApp/>}>
        <Route path = ":id" element = {<div>new element</div>}></Route>
      </Route>
      <Route path = "/test" element = {<Test/>}></Route>
      <Route path = "/error" element = {<Error/>}></Route>
    </Routes>
    </>
  )
}

export default App
