// src/components/VideoPlayerModal.jsx
import { useState, useEffect, useRef } from 'react';

function VideoPlayerModal({ videoData, onClose }) {
  const videoRef = useRef(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  // --- THÊM LẠI: State để lưu frame name ---
  const [currentFrameName, setCurrentFrameName] = useState("");

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Tự động tua đến đúng timestamp
    const handleLoadedMetadata = () => {
      videoElement.currentTime = videoData.timestamp_ms / 1000;
    };

    // Cập nhật frame index và frame name khi video chạy
    const handleTimeUpdate = () => {
      if (!videoData.fps) return;
      const currentTime = videoElement.currentTime;
      const frameNumber = Math.floor(currentTime * videoData.fps);
      
      // Cập nhật cả hai state
      setCurrentFrameIndex(frameNumber);
      
      const formattedFrameNumber = String(frameNumber).padStart(6, '0');
      setCurrentFrameName(`${formattedFrameNumber}.webp`);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoData]);

  return (
    // Lớp phủ nền
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- SỬA LẠI: Header để hiển thị thêm frame name --- */}
        <div className="p-3 text-white font-bold text-lg border-b border-gray-700 flex justify-between items-center">
          {/* Phần bên trái: Tên video và tên frame */}
          <div className="flex items-baseline space-x-3">
            <span>Video: {videoData.video_name}</span>
            <span className="text-sm font-normal text-gray-400">{currentFrameName}</span>
          </div>
          {/* Nút đóng */}
          <button onClick={onClose} className="text-white text-3xl font-bold leading-none hover:text-gray-400">&times;</button>
        </div>
        
        {/* Video Player */}
        <video ref={videoRef} src={videoData.video_url} controls autoPlay className="w-full" />

        {/* Footer: Hiển thị thông tin frame index và FPS */}
        <div className="p-3 text-white text-sm bg-gray-900 rounded-b-lg flex justify-between items-center">
          <div>
            <span className="font-semibold">Current Frame Index:</span> {currentFrameIndex}
          </div>
          {videoData.fps && (
            <div>
              <span className="font-semibold">FPS:</span> {videoData.fps}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerModal;