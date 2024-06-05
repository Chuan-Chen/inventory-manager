import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InventoryApp from "./pages/InventoryApp";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";


function App() {


  return (
    <>
    <Routes>
      <Route path = "login" element={<LoginPage/>}></Route>
      <Route path = "app" element={<InventoryApp/>}></Route>
      <Route path = "createaccount" element = {<CreateAccountPage/>}></Route>
      <Route path = "/" element={<LandingPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
