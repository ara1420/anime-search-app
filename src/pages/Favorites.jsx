import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard.jsx";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("favoriteAnimes")) || [];
      setFavorites(data);
    } catch {
      setFavorites([]);
    }
  }, []);

  return (
    <div className="container">
      <h1>お気に入り一覧</h1>

      {favorites.length === 0 && (
        <p>お気に入りがありません。</p>
      )}

      <div className="anime-list">
        {favorites.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
