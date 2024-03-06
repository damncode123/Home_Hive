import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/properties/:listingId" element={<ListingDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
