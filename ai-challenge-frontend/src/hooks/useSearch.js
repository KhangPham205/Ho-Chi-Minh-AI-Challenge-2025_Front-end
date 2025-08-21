// src/hooks/useSearch.js
import { useState } from "react";
import { searchText, searchTemporal, searchImage } from "../api/searchService";

export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // search text
  const doTextSearch = async (query, k = 50) => {
    console.log("Calling backend with query:", query, "k=", k);
    setLoading(true);
    setError(null);
    try {
      const data = await searchText(query, k);
      setResults(data);
    } catch (err) {
      setError(err.message || "Search error");
    } finally {
      setLoading(false);
    }
  };

  // search temporal
  const doTemporalSearch = async (query, k = 50) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchTemporal(query, k);
      setResults(data);
    } catch (err) {
      setError(err.message || "Search error");
    } finally {
      setLoading(false);
    }
  };

  // search image
  const doImageSearch = async (file, k = 50) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchImage(file, k);
      setResults(data);
    } catch (err) {
      setError(err.message || "Search error");
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    doTextSearch,
    doTemporalSearch,
    doImageSearch,
  };
}
