// src/api/anilist.js

const ENDPOINT = "https://graphql.anilist.co";

// アニメ検索（タイトルで検索）
export async function searchAnime(title) {
  const query = `
    query ($search: String) {
      Page(perPage: 20) {
        media(search: $search, type: ANIME) {
          id
          title {
            romaji
            native
          }
          description(asHtml: false)
          coverImage {
            large
          }
          seasonYear
          averageScore
        }
      }
    }
  `;

  const variables = { search: title };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error("AniList API error");
  }

  const data = await res.json();
  return data.data.Page.media;
}

// ID からアニメの詳細を取得
export async function getAnimeById(id) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          native
        }
        description(asHtml: false)
        coverImage {
          large
        }
        seasonYear
        averageScore
        episodes
        status
        genres
        siteUrl

        characters(sort: [ROLE, RELEVANCE], perPage: 15) {
          edges {
            role
            node {
              name {
                full
              }
              image {
                large
              }
            }
            voiceActors(language: JAPANESE) {
              name {
                full
              }
              image {
                large
              }
            }
          }
        }
      }
    }
  `;

  const variables = { id: Number(id) };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error("AniList API error");

  const data = await res.json();
  return data.data.Media;
}

