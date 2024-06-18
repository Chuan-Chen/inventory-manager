import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InventoryApp from "./pages/InventoryApp";
import LoginPage from "./pages/LoginPage";



function App() {
  return (
    <>
    <Routes>
      <Route path = "oauth" element={<InventoryApp/>}></Route>
      <Route path = "auth" element={<LoginPage/>}></Route>
      <Route path = "app" element={<InventoryApp/>}></Route>
      <Route path = "/" element={<LandingPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
