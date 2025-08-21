// src/api/searchService.js
import apiClient from "./apiClient";
import { SearchQuery, SearchResult } from "../models/SearchModels";

// search API
export const searchApi = async (payload) => {
  try {
    const response = await apiClient.post("/search", payload);
    return response.data;
  } catch (err) {
    console.error("Search API error:", err);
    throw err;
  }
};


// Search theo text
export async function searchText(queryText, k = 50) {
  const query = new SearchQuery({ mode: "text", text: queryText, k });
  const res = await apiClient.post("/search/text", query);

  return res.data.results.map(r => new SearchResult(r));
}

// Search theo temporal
export async function searchTemporal(queryTemporal, k = 50) {
  const query = new SearchQuery({ mode: "temporal", temporal: queryTemporal, k });
  const res = await apiClient.post("/search/temporal", query);

  return res.data.results.map(r => new SearchResult(r));
}

// Search theo image
export async function searchImage(imageFile, k = 50) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("k", k);

  const res = await apiClient.post("/search/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.results.map(r => new SearchResult(r));
}