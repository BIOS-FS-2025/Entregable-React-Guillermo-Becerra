import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SearcherLayout from "./layouts/SearcherLayout";
import Home from "./pages/Home";
import Card from "./pages/Card";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="card" element={<SearcherLayout />}>
          <Route index element={<Card />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
