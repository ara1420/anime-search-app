import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import AnimeList from "../components/AnimeList.jsx";
import { searchAnime } from "../api/anilist.js";

const HISTORY_KEY = "searchHistory";

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(loadHistory());

  const handleSearch = async (keyword) => {
    setLoading(true);
    setError("");

    // 🔥 履歴追加（重複無し & 先頭追加 & 最大10件）
    const newHistory = [keyword, ...history.filter(h => h !== keyword)].slice(0, 10);
    setHistory(newHistory);
    saveHistory(newHistory);

    try {
      const result = await searchAnime(keyword);
      setAnimes(result);
    } catch (e) {
      setError("検索中にエラーが発生しました。");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {/* 🔥 検索履歴 */}
      {history.length > 0 && (
        <div style={{ margin: "12px 0" }}>
          <h3>検索履歴</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => handleSearch(h)}
                style={{
                  padding: "6px 10px",
                  background: "#1e293b",
                  border: "1px solid #475569",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <p>読み込み中...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <AnimeList animes={animes} />}
    </div>
  );
}
