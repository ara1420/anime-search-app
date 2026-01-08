import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Favorites from "./pages/Favorites.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
  <div className="header-inner">
    <Link to="/" className="logo">
      アニメ検索アプリ
    </Link>
    <Link to="/favorites" className="nav-link" style={{ marginLeft: "16px" }}>
      お気に入り一覧
    </Link>
  </div>
</header>


      <main className="main">
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Anime Search App</p>
      </footer>
    </BrowserRouter>
  );
}
