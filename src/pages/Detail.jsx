import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAnimeById } from "../api/anilist.js";
import FavoriteButton from "../components/FavoriteButton.jsx";
import SpeechButton from "../components/SpeechButton.jsx";

export default function Detail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAnimeById(id);
        setAnime(data);
      } catch (e) {
        setError("詳細の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!anime) return <p>データがありません。</p>;

  const title = anime.title.romaji || anime.title.native;

  return (
    <div className="container">
      <Link to="/">&larr; 検索結果に戻る</Link>

      <div className="detail">
        <img
          className="detail-cover"
          src={anime.coverImage.large}
          alt={title}
        />

        <div className="detail-main">
          <h1>{title}</h1>
          <p>放送年: {anime.seasonYear ?? "不明"}</p>
          <p>話数: {anime.episodes ?? "不明"}</p>
          <p>ステータス: {anime.status ?? "不明"}</p>
          <p>ジャンル: {anime.genres?.join(" / ") ?? "なし"}</p>
          <p>スコア: {anime.averageScore ?? "なし"}</p>

          <div className="detail-actions">
            <FavoriteButton anime={anime} />
            <SpeechButton text={`${title} の情報です。`} />
            <a href={anime.siteUrl} target="_blank" rel="noreferrer">
              AniList で詳細を見る
            </a>
          </div>
        </div>
      </div>

      {anime.description && (
        <section className="description">
          <h2>あらすじ</h2>
          <p>{anime.description}</p>
        </section>
      )}
      {/* キャラクター一覧 */}
{anime.characters && anime.characters.edges.length > 0 && (
  <section className="description">
    <h2>キャラクター & 声優（日本）</h2>

    <div className="char-list">
      {anime.characters.edges.map((c, i) => (
        <div key={i} className="char-card">

          {/* キャラ画像 */}
          <img
            src={c.node.image?.large}
            alt={c.node.name.full}
            className="char-img"
          />

          <strong>{c.node.name.full}</strong>

          {/* 声優（日本語） */}
          <div className="va-area">
            {c.voiceActors?.[0] ? (
              <>
                <img
                  src={c.voiceActors[0].image?.large}
                  alt={c.voiceActors[0].name.full}
                  className="va-img"
                />
                <span className="va-name">{c.voiceActors[0].name.full}</span>
              </>
            ) : (
              <span className="va-name">声優情報なし</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
)}

    </div>
  );
}


