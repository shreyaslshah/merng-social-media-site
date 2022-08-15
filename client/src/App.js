import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<SinglePost/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
