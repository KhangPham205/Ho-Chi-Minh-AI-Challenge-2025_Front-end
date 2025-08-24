// src/api/searchService.js
import apiClient from "./apiClient";
import { SearchResult } from "../models/SearchModels";

/**
 * Gửi yêu cầu tìm kiếm bằng văn bản.
 * @param {string} query - Chuỗi văn bản tìm kiếm.
 * @param {number} k - Số lượng kết quả.
 * @param {string} model - Tên model.
 * @returns {Promise<SearchResult[]>}
 */
export async function searchText(query, k, model) {
  const params = { query, top_k: k, model };
  const response = await apiClient.post("/search_text", null, { params });
  
  // Ánh xạ kết quả trả về thành các đối tượng SearchResult
  return response.data.results.map(r => new SearchResult(r));
}

/**
 * Gửi yêu cầu tìm kiếm bằng hình ảnh.
 * @param {File} imageFile - File hình ảnh.
 * @param {number} k - Số lượng kết quả.
 * @param {string} model - Tên model.
 * @returns {Promise<SearchResult[]>}
 */
export async function searchImage(imageFile, k, model) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const params = { top_k: k, model };
  
  const response = await apiClient.post("/search_image", formData, {
    params,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.results.map(r => new SearchResult(r));
}