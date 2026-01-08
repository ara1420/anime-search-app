import AnimeCard from "./AnimeCard.jsx";

export default function AnimeList({ animes }) {
  if (!animes || animes.length === 0) {
    return <p>検索結果はありません。</p>;
  }

  return (
    <div className="anime-list">
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
