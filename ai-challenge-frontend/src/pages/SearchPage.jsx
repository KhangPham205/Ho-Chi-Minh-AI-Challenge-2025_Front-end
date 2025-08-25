// src/pages/SearchPage.jsx
import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

// Import các component con
import ResultItem from '../components/ResultItem';
import VideoPlayerModal from '../components/VideoPlayerModal';
import AsrResultGroup from "../components/AsrResultGroup";
import TemporalResultGroup from "../components/TemporalResultGroup";

// Component con cho giao diện nhập liệu Temporal
const TemporalInput = ({ temporalData, setTemporalData }) => {
  const handleInputChange = (e, index, field) => {
    const newEvents = [...temporalData.events];
    newEvents[index][field] = e.target.value;
    setTemporalData({ ...temporalData, events: newEvents });
  };
  return (
    <div className="space-y-3">{[0, 1, 2].map(i => (<div key={i} className="p-3 bg-gray-900 rounded-lg space-y-2"><h3 className="text-md font-semibold text-blue-300">Event {i + 1}</h3><textarea className="w-full h-20 p-2 bg-gray-700 rounded resize-none" placeholder={`Scene ${i + 1} description...`} value={temporalData.events[i].query} onChange={(e) => handleInputChange(e, i, 'query')} /><div className="grid grid-cols-2 gap-2"><input type="text" className="w-full p-2 bg-gray-700 rounded text-sm" placeholder="OCR filter..." value={temporalData.events[i].ocr} onChange={(e) => handleInputChange(e, i, 'ocr')} /><input type="text" className="w-full p-2 bg-gray-700 rounded text-sm" placeholder="ASR filter..." value={temporalData.events[i].asr} onChange={(e) => handleInputChange(e, i, 'asr')} /></div></div>))}</div>
  );
};


function SearchPage() {
  const { results, isLoading, error, resultType, executeSearch } = useSearch();

  // --- UI State Management ---
  const [mode, setMode] = useState("text");
  const [k, setK] = useState(25);
  const [textQuery, setTextQuery] = useState("");
  const [ocrQuery, setOcrQuery] = useState("");
  const [asrQuery, setAsrQuery] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [ocrFilter, setOcrFilter] = useState("");
  const [asrFilter, setAsrFilter] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedModel, setSelectedModel] = useState('beit3');
  
  const [temporalData, setTemporalData] = useState({
    events: [{ query: "", ocr: "", asr: "" },{ query: "", ocr: "", asr: "" },{ query: "", ocr: "", asr: "" },],
    model: 'beit3',
    topk_per_event: 200,
  });
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ sender: 'bot', text: '👋 Hello there!' }]);

  const handleModeChange = (newMode) => {
    // 1. Cập nhật mode mới
    setMode(newMode);
    
    // 2. Reset tất cả các ô nhập liệu
    setTextQuery("");
    setOcrQuery("");
    setAsrQuery("");
    setImageFile(null);
    setOcrFilter("");
    setAsrFilter("");
    setTemporalData({
      events: [{ query: "", ocr: "", asr: "" },{ query: "", ocr: "", asr: "" },{ query: "", ocr: "", asr: "" }],
      model: 'beit3',
      topk_per_event: 200,
    });

    // 3. Xóa kết quả tìm kiếm và lỗi cũ
    clearSearchState();
  };

  const handleSearch = () => {
    let query = "";
    if (mode === 'text') query = textQuery;
    else if (mode === 'ocr') query = ocrQuery;
    else if (mode === 'asr') query = asrQuery;

    const searchParams = {
      mode, 
      query, 
      imageFile, 
      k, 
      model: selectedModel,
      ocrFilter, 
      asrFilter,
      temporalData,
    };
    executeSearch(searchParams);
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendMessage = () => { /* ... */ };

  const baseButtonClass = "flex-1 py-2 px-2 text-sm font-semibold rounded-md transition-colors duration-200 text-center";
  const activeButtonClass = "bg-blue-600 text-white";
  const inactiveButtonClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";

  return (
    <div className="flex h-screen bg-[#242424] text-white">
      <aside className="w-[400px] h-full flex flex-col bg-gray-800 p-4 space-y-4 overflow-y-auto">
        <div className="text-xl font-bold">Web Search</div>

        {/* Mode Buttons */}
        <div className="grid grid-cols-3 gap-1 bg-gray-900 p-1 rounded-lg">
          {['text', 'image', 'ocr', 'asr', 'temporal'].map(m => (
            <button key={m} className={`${baseButtonClass} ${mode === m ? activeButtonClass : inactiveButtonClass} ${m === 'temporal' ? 'col-span-2' : ''}`} onClick={() => handleModeChange(m)}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div>
          {mode === 'text' && <textarea className="w-full h-28 p-2 bg-gray-700 rounded" value={textQuery} onChange={(e) => setTextQuery(e.target.value)} placeholder="Enter text query..." />}
          {mode === 'ocr' && <textarea className="w-full h-28 p-2 bg-gray-700 rounded" value={ocrQuery} onChange={(e) => setOcrQuery(e.target.value)} placeholder="Enter OCR query..." />}
          {mode === 'asr' && <textarea className="w-full h-28 p-2 bg-gray-700 rounded" value={asrQuery} onChange={(e) => setAsrQuery(e.target.value)} placeholder="Enter ASR query..." />}
          {mode === 'image' && (
            <div className="bg-gray-700 p-6 rounded text-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="text-2xl">📤</span>
                <p className="font-semibold mt-1 text-blue-300 break-words">{imageFile ? imageFile.name : 'Upload Image'}</p>
              </label>
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>
          )}
          {mode === 'temporal' && <TemporalInput temporalData={temporalData} setTemporalData={setTemporalData} />}
        </div>
        
        {/* Dropdown chọn Model */}
        {(mode !== 'asr' && mode !== 'ocr') && (
          <div className="bg-gray-900 p-3 rounded-lg">
            <label htmlFor="model-select" className="block font-semibold mb-2">Select Model</label>
            <select id="model-select" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
              <option value="beit3">beit3</option>
              <option value="vith14">vith14</option>
              <option value="vitg14">vitg14</option>
              {mode === 'image' && <option value="fused">fused</option>}
            </select>
          </div>
        )}
        
        {/* Filter Panel và K Slider */}
        {mode !== 'temporal' && mode !== 'ocr' && mode !== 'asr' && (
            <>
              <div className="bg-gray-900 p-3 rounded-lg space-y-3">
                <h2 className="text-lg font-bold">Filter Panel</h2>
                <input type="text" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" placeholder="OCR Filter..." value={ocrFilter} onChange={(e) => setOcrFilter(e.target.value)} />
                <input type="text" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" placeholder="ASR Filter..." value={asrFilter} onChange={(e) => setAsrFilter(e.target.value)} />
              </div>
            </>
        )}

        {mode !== 'temporal' && (
            <>
              <div className="bg-gray-900 p-3 rounded-lg">
                  <label htmlFor="kRange" className="block font-semibold">Top K: <span className="text-blue-400">{k}</span></label>
                  <input type="range" id="kRange" min="25" max="400" step="25" value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full mt-2 accent-blue-500" />
              </div>
            </>
        )}

        <div className="flex-grow"></div>
        <div className="space-y-3">
          <button onClick={handleSearch} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-bold disabled:bg-gray-500" disabled={isLoading}>
            {isLoading ? 'Searching...' : '🚀 Search'}
          </button>
        </div>
      </aside>

       <main className="flex-1 h-full p-4 overflow-y-auto">
        {isLoading && (<p className="text-center text-gray-400">Loading...</p>)}
        {!isLoading && error && (<p className="text-center text-red-400">{error}</p>)}

        {results.length > 0 && (
          resultType === 'grouped' ? <div>{results.map(group => <AsrResultGroup key={group.video_name} videoGroup={group} onVideoClick={setSelectedVideo} onImageClick={openImageInNewTab} />)}</div> :
          resultType === 'temporal' ? <div>{results.map(group => <TemporalResultGroup key={group.video_name} videoGroup={group} onVideoClick={setSelectedVideo} onImageClick={openImageInNewTab} />)}</div> :

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {results.filter(r => r.frame_url).map(r => (
            <ResultItem key={r.id} result={r} onVideoClick={setSelectedVideo} onImageClick={openImageInNewTab} />
        ))}
        </div>
      )}
       </main>
      
      {selectedVideo && <VideoPlayerModal videoData={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      
      {/* Chatbot UI */}
      <button onClick={() => setIsChatOpen(true)} className="fixed z-50 bottom-5 right-5 bg-[#DAA295] text-white p-3 rounded-full shadow-lg hover:bg-[#CF8777] text-2xl">👻</button>
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col text-black z-50">
          <div className="bg-[#DAA295] text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">Chatbot</span>
            <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">❌</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex space-x-2">
            <input type="text" placeholder="Type a message..." className="flex-1 p-2 border rounded" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
            <button onClick={handleSendMessage} className="bg-[#DAA295] text-white px-4 rounded">➤</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;