import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SearcherLayout from "./layouts/SearcherLayout";
import Home from "./pages/Home";
import Card from "./pages/Card";
import { ThemeProvider } from "./context/ThemeContext";
import CardDetail from "./components/CardDetail";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
          <Route path="card" element={<SearcherLayout />}>
            <Route index element={<Card />} />
            <Route path="/card/:name" element={<CardDetail />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
