import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";
import SpeechButton from "./SpeechButton.jsx";

export default function AnimeCard({ anime }) {
  const title = anime.title.romaji || anime.title.native;

  return (
    <div className="anime-card">
      <Link to={`/detail/${anime.id}`} className="anime-card-thumb">
        <img src={anime.coverImage.large} alt={title} />
      </Link>

      <div className="anime-card-body">
        <h3>{title}</h3>
        <p className="anime-meta">
          {anime.seasonYear ?? "年不明"} / スコア: {anime.averageScore ?? "―"}
        </p>
        <div className="anime-card-actions">
          <FavoriteButton anime={anime} />
          <SpeechButton text={`${title} です。`} />
        </div>
      </div>
    </div>
  );
}
