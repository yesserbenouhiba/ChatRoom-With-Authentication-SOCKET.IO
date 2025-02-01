import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Forms/signUp";
import SignIn from "./components/Forms/signIn";
import Chat from "./components/Chat/chat";

function App() {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/Dashboard" element={<Chat />} />
    </Routes>
  );
}

export default App;
