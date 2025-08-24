import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: for blur effect

function SearchPage() {
  // --- State cho các input trên UI ---
  const [mode, setMode] = useState("text");
  const [k, setK] = useState(25);
  const [textQuery, setTextQuery] = useState("");
  const [temporalQuery, setTemporalQuery] = useState("");
  const [ocrFilter, setOcrFilter] = useState("");
  const [asrFilter, setAsrFilter] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // --- 2. Lấy state và hàm thực thi từ hook ---
  const { results, isLoading, error, executeSearch } = useSearch();

  // --- State cho Chatbot (không đổi) ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: '👋 Loo loo' }
  ]);
  
  // Hàm handleSearch
  const handleSearch = () => {
    const searchParams = {
      mode,
      query: mode === 'text' ? textQuery : temporalQuery,
      imageFile,
      k,
      model: 'beit3' // Cấu hình model mặc định
    };
    executeSearch(searchParams);
  };
  
  // ... (Các hàm khác giữ nguyên)
  const handleTranslate = () => { /* ... */ };
  const handleSendMessage = () => { /* ... */ };

  const baseButtonClass = "flex-1 py-2 px-2 text-sm font-semibold rounded-md transition-colors duration-200 text-center";
  const activeButtonClass = "bg-blue-600 text-white";
  const inactiveButtonClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";

  return (
    <div className="flex h-screen bg-[#242424]">
      {/* Sidebar */}
      <aside className="w-[400px] h-full flex flex-col bg-gray-800 p-4 space-y-4 overflow-y-auto">
        {/* ... (Phần JSX của sidebar giữ nguyên) ... */}
         <div className="text-xl font-bold text-white">Web Search</div>
        <div className="flex space-x-2 bg-gray-900 p-1 rounded-lg">
          <button className={`${baseButtonClass} ${mode === 'text' ? activeButtonClass : inactiveButtonClass}`} onClick={() => setMode("text")}>Text</button>
          <button className={`${baseButtonClass} ${mode === 'temporal' ? activeButtonClass : inactiveButtonClass}`} onClick={() => setMode("temporal")}>Temporal</button>
          <button className={`${baseButtonClass} ${mode === 'image' ? activeButtonClass : inactiveButtonClass}`} onClick={() => setMode("image")}>Image</button>
        </div>
        <div>
          {mode === 'text' && <textarea className="w-full h-28 p-2 bg-gray-700 rounded resize-none" placeholder="Enter your text query..." value={textQuery} onChange={(e) => setTextQuery(e.target.value)} />}
          {mode === 'temporal' && <textarea className="w-full h-28 p-2 bg-gray-700 rounded resize-none" placeholder="Enter your temporal query..." value={temporalQuery} onChange={(e) => setTemporalQuery(e.target.value)} />}
          {mode === 'image' && (
            <div className="bg-gray-700 p-6 rounded text-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="text-2xl">📤</span>
                <p className="font-semibold mt-1 text-blue-300 break-words">
                  {imageFile ? imageFile.name : 'Upload Image'}
                </p>
              </label>
              <input 
                id="image-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])} 
              />
            </div>
          )}
        </div>
        <div className="bg-gray-900 p-3 rounded-lg space-y-3">
          <h2 className="text-lg font-bold">Filter Panel</h2>
          <input type="text" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" placeholder="OCR Filter..." value={ocrFilter} onChange={(e) => setOcrFilter(e.target.value)} />
          <input type="text" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" placeholder="ASR Filter..." value={asrFilter} onChange={(e) => setAsrFilter(e.target.value)} />
        </div>
        <div className="bg-gray-900 p-3 rounded-lg">
          <label htmlFor="kRange" className="block font-semibold">Top K: <span className="text-blue-400">{k}</span></label>
          <input type="range" id="kRange" min="25" max="400" step="25" value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full mt-2 accent-blue-500" />
        </div>
        <div className="flex-grow"></div>
        <div className="space-y-3">
          <button onClick={handleSearch} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-bold disabled:bg-gray-500" disabled={isLoading}>
            {isLoading ? 'Searching...' : '🚀 Search'}
          </button>
        </div>
      </aside>

      {/* Phần hiển thị kết quả */}
      <main className="flex-1 h-full p-4 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
          {isLoading && (<p className="col-span-full text-center text-gray-400">Loading...</p>)}
          {!isLoading && error && (<p className="col-span-full text-center text-red-400">{error}</p>)}
          {results.length > 0 && 
            results
              .filter(result => result.frame_url) 
              .map((result) => (
                <div key={result.id} className="aspect-[16/9] bg-gray-700">
                  <LazyLoadImage
                    alt={result.frame_name || 'Search result'}
                    src={result.frame_url}
                    effect="blur" // Hiệu ứng mờ đẹp mắt khi tải
                    className="w-full h-full object-cover"
                    // Ảnh giữ chỗ sẽ hiển thị trong khi chờ
                    placeholderSrc="https://via.placeholder.com/320x180?text=..." 
                  />
                </div>
              ))
          }
        </div>
      </main>

      {/* Chatbot */}
       <button onClick={() => setIsChatOpen(true)} className="fixed z-50 bottom-5 right-5 bg-[#DAA295] text-white p-3 rounded-full shadow-lg hover:bg-[#CF8777] text-2xl">
        👻
      </button>
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col text-black z-50">
          <div className="bg-[#DAA295] text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">Chatbot</span>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">❌</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex space-x-2">
            <input type="text" placeholder="Nhập tin nhắn..." className="flex-1 p-2 border rounded" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
            <button onClick={handleSendMessage} className="bg-[#DAA295] text-white px-4 rounded">➤</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;