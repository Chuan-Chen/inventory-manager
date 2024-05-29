import {Link, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InventoryApp from "./pages/InventoryApp";


function App() {


  return (
    <>
    <Routes>
      <Route path = "app" element={<InventoryApp/>}></Route>
      <Route path = "/" element={<LandingPage/>}></Route>
    </Routes>
    </>

  )
}

export default App
