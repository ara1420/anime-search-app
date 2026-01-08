import { useEffect, useState } from "react";

const STORAGE_KEY = "favoriteAnimes";

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function FavoriteButton({ anime }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const list = loadFavorites();
    setIsFavorite(list.some((a) => a.id === anime.id));
  }, [anime.id]);

  const toggleFavorite = () => {
    const list = loadFavorites();

    if (isFavorite) {
      const newList = list.filter((a) => a.id !== anime.id);
      saveFavorites(newList);
      setIsFavorite(false);
    } else {
      const simple = {
        id: anime.id,
        title: anime.title,
        coverImage: anime.coverImage,
        seasonYear: anime.seasonYear,
        averageScore: anime.averageScore,
      };
      const newList = [...list, simple];
      saveFavorites(newList);
      setIsFavorite(true);
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "★ お気に入り解除" : "☆ お気に入り追加"}
    </button>
  );
}
