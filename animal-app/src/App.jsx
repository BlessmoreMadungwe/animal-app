import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ViewAnimals from "./components/ViewAnimals";
import About from "./components/About";
import Contact from "./components/Contact";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddAnimal from "./components/AddAnimal";  // ✅ import new page
import ManageAnimals from "./components/ManageAnimals";
import Donate from "./components/Donate";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<ViewAnimals />} /> {/* 👈 now linked */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> }/>
        <Route path="/add-animal"element={ <ProtectedRoute> <AddAnimal /></ProtectedRoute> }/>
        <Route path="/manage-animals"element={ <ProtectedRoute> <ManageAnimals /></ProtectedRoute> }/>
        <Route path="/donate" element={<Donate />} />

      </Routes>
    </>
  );
}
