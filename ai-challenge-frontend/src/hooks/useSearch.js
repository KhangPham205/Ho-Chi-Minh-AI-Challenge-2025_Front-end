// src/hooks/useSearch.js
import { useState } from "react";
import axios from "axios";

export function useSearch() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const executeSearch = async (searchParams) => {
    setIsLoading(true);
    setError("");
    setResults([]);

    const { mode, query, imageFile, k, model } = searchParams;

    try {
      let response;
      if (mode === 'text' || mode === 'temporal') {
        if (!query) throw new Error("Vui lòng nhập nội dung tìm kiếm!");
        
        const params = { query, top_k: k, model };
        console.log("Sending text search request:", params);
        response = await axios.post('http://localhost:8000/search_text', null, { params });

      } else if (mode === 'image') {
        if (!imageFile) throw new Error("Vui lòng chọn một hình ảnh!");

        // Tạo FormData để gửi file
        const formData = new FormData();
        formData.append("image", imageFile);
        
        const params = { top_k: k, model };
        console.log("Sending image search request:", params);
        
        // Gửi request với header multipart/form-data
        response = await axios.post("http://localhost:8000/search_image", formData, { 
          params,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      console.log("Response from BE:", response.data);
      const searchResults = response.data?.results || [];
      setResults(searchResults);

      if (searchResults.length === 0) {
        setError("No results found for your query.");
      }

    } catch (err) {
      console.error("Search hook error:", err);
      setError(err.message || "An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    executeSearch,
  };
}