// src/pages/SearchPage.jsx

import { useState } from "react";

function SearchPage() {
  const [mode, setMode] = useState("text"); // 'text', 'temporal', hoặc 'image'
  const [k, setK] = useState(200);
  const [textQuery, setTextQuery] = useState("");
  const [temporalQuery, setTemporalQuery] = useState("");
  const [ocrFilter, setOcrFilter] = useState("");
  const [asrFilter, setAsrFilter] = useState("");

  const handleSearch = () => {
    console.log("Search clicked:", { mode, k, textQuery, temporalQuery, ocrFilter, asrFilter });
  };

  const handleTranslate = () => {
    console.log("Translate clicked:", { mode, textQuery, temporalQuery });
  };

  return (
    // Thẻ bọc ngoài cùng để chứa toàn bộ giao diện
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="bg-[#896C6C] p-2 rounded-t-lg flex justify-between items-center">
        <div className="text-lg font-bold text-white">Web Search</div>
        <div className="flex space-x-4">
          <button className="bg-[#F5FAE1] text-black px-4 py-2 rounded hover:bg-gray-300" onClick={() => setMode("text")}>
            Text Search
          </button>
          <button className="bg-[#F5FAE1] text-black px-4 py-2 rounded hover:bg-gray-300" onClick={() => setMode("temporal")}>
            Temporal Search
          </button>
          <button className="bg-[#F5FAE1] text-black px-4 py-2 rounded hover:bg-gray-300" onClick={() => setMode("image")}>
            Image Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F5FAE1] p-4 rounded-b-lg mt-2">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Cột trái */}
          <div className="w-full md:w-1/2">
            {/* Dùng điều kiện để hiển thị đúng ô input theo 'mode' */}
            {mode === 'text' && (
              <div className="bg-white p-4 rounded">
                <textarea className="w-full h-32 p-2 border border-gray-300 rounded resize-none" placeholder="Enter your text query..." value={textQuery} onChange={(e) => setTextQuery(e.target.value)} />
              </div>
            )}
            {mode === 'temporal' && (
              <div className="bg-white p-4 rounded">
                <textarea className="w-full h-32 p-2 border border-gray-300 rounded resize-none" placeholder="Enter your temporal query..." value={temporalQuery} onChange={(e) => setTemporalQuery(e.target.value)} />
              </div>
            )}
            {mode === 'image' && (
              <div className="bg-white p-9 rounded">
                <label className="block mb-2 font-semibold">📤 Upload Image</label>
                <input type="file" className="mb-2" />
                <p className="text-sm text-gray-500">Upload an image to search</p>
              </div>
            )}

            {/* K slider */}
            <div className="mt-4">
              <label htmlFor="kRange" className="block font-semibold">K</label>
              <div className="flex items-center space-x-2">
                <span className="w-10 text-right">{k}</span>
                <input
                  type="range"
                  id="kRange"
                  min="25" max="400" step="25"
                  value={k}
                  onChange={(e) => setK(Number(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Cột phải: Filter Panel */}
          <div className="w-full md:w-1/2">
            <div className="bg-[#EEE6CA] p-4 rounded h-full">
              <h2 className="text-xl font-bold mb-4">Filter Panel</h2>
              <input type="text" className="w-full p-2 mb-2 border border-gray-300 rounded" placeholder="OCR Filter..." value={ocrFilter} onChange={(e) => setOcrFilter(e.target.value)} />
              <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="ASR Filter..." value={asrFilter} onChange={(e) => setAsrFilter(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Nút Translate (chỉ hiện khi không phải Image Search) */}
        {mode !== 'image' && (
          <button onClick={handleTranslate} className="mt-4 bg-[#CDBBB7] text-white px-4 py-3 rounded w-full hover:bg-opacity-80 text-lg font-bold">
            🔎 Translate
          </button>
        )}

        {/* Nút Search */}
        <button onClick={handleSearch} className="mt-4 bg-[#CDBBB7] text-white px-4 py-3 rounded w-full hover:bg-opacity-80 text-lg font-bold">
          🔎 Search
        </button>

        {/* Khu vực kết quả */}
        <div className="bg-[#896C6C] p-4 mt-4 rounded grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[10rem] max-h-96 overflow-y-auto">
          {/* Kết quả sẽ được hiển thị ở đây */}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;