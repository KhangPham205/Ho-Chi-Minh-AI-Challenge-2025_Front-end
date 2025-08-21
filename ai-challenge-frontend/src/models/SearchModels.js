// Dữ liệu backend trả về cho một kết quả
export class SearchResult {
  constructor({ id, title, thumbnailUrl, score }) {
    this.id = id;
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.score = score;
  }
}

// Dữ liệu query gửi lên backend
export class SearchQuery {
  constructor({ mode, text, temporal, image, k, ocrFilter, asrFilter }) {
    this.mode = mode;           // "text" | "temporal" | "image"
    this.text = text || "";
    this.temporal = temporal || "";
    this.image = image || null; // File hoặc base64
    this.k = k || 50;
    this.ocrFilter = ocrFilter || "";
    this.asrFilter = asrFilter || "";
  }
}
