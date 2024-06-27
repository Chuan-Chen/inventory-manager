import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InventoryApp from "./pages/InventoryApp";
import LoginPage from "./pages/LoginPage";



function App() {
  
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
    </Routes>
    </>
  )
}

export default App
