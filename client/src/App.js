import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./Contracts";
import ContractsInfo from "./ContractsInfo";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/info" element={<ContractsInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
