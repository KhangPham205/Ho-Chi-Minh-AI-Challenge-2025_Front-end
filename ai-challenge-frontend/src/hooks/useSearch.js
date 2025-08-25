// src/hooks/useSearch.js
import { useState } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

export function useSearch() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultType, setResultType] = useState('grid');

  // Hàm để reset trạng thái từ bên ngoài
  const clearSearchState = () => {
    setResults([]);
    setError("");
    setResultType('grid');
  };

  const executeSearch = async (searchParams) => {
    setResults([]);
    setError("");
    setIsLoading(true);
    setResultType('grid');

    // Logic kiểm tra đầu vào
    try {
      const { mode, query, imageFile, temporalData } = searchParams;
      if ((mode === 'text' || mode === 'ocr' || mode === 'asr') && (!query || !query.trim())) {
        throw new Error("Please enter a search query.");
      }
      if (mode === 'image' && !imageFile) {
        throw new Error("Please upload an image to search.");
      }
      if (mode === 'temporal' && (!temporalData || !temporalData.events.some(e => e.query.trim()))) {
        throw new Error("Please enter a description for at least one event.");
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return;
    }

    try {
      let response;
      const { mode, query, imageFile, k, model, temporalData, ocrFilter, asrFilter } = searchParams;
      const baseParams = { query, top_k: k, model, ocr_filter: ocrFilter, asr_filter: asrFilter };

      if (mode === 'text' || mode === 'ocr') {
        const endpoint = mode === 'text' ? '/search_text' : '/search_ocr';
        response = await apiClient.post(endpoint, null, { params: baseParams });
        setResults(response.data.results || []);
      } else if (mode === 'image') {
        const formData = new FormData();
        formData.append("image", imageFile);
        response = await apiClient.post("/search_image", formData, { params: { top_k: k, model }, headers: { "Content-Type": "multipart/form-data" } });
        setResults(response.data.results || []);
      } else if (mode === 'asr') {
        response = await apiClient.post('/search_asr', null, { params: { query, asr_filter: asrFilter } });
        setResultType('grouped');
        setResults(response.data.videos || []);
      } else if (mode === 'temporal') {
        const flatTemporalParams = {
          q1: temporalData.events[0].query, ocr1: temporalData.events[0].ocr, asr1: temporalData.events[0].asr,
          q2: temporalData.events[1].query, ocr2: temporalData.events[1].ocr, asr2: temporalData.events[1].asr,
          q3: temporalData.events[2].query, ocr3: temporalData.events[2].ocr, asr3: temporalData.events[2].asr,
          model: model,
          topk_per_event: temporalData.topk_per_event
        };
        response = await apiClient.post('/search_temporal', null, { params: flatTemporalParams });
        setResultType('temporal');
        setResults(response.data.videos || []);
      }

      console.log("✅ Response from Backend:", response.data);


      if (!response.data.results && !response.data.videos) {
        setError("No results found for your query.");
      }
    } catch (err) {
      console.error("Search hook error:", err);
      setError(err.response?.data?.detail || err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, resultType, executeSearch, clearSearchState };
}