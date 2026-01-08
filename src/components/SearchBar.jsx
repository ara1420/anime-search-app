import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = text.trim();
    if (!keyword) return;
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="アニメ名で検索..."
      />
      <button type="submit">検索</button>
    </form>
  );
}
