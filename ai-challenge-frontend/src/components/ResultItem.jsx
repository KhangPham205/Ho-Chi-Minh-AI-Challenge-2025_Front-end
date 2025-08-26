// src/components/ResultItem.jsx

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Biểu tượng kính lúp (SVG)
const SearchIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

function ResultItem({ result, onVideoClick, onImageClick }) {
  if (!result || !result.frame_url) {
    return null; // Không render gì nếu không có URL
  }

  // Xử lý sự kiện click trên các icon, ngăn không cho sự kiện lan ra ngoài
  const handleVideoIconClick = (e) => {
    e.stopPropagation();
    onVideoClick(result);
  };

  const handleImageIconClick = (e) => {
    e.stopPropagation();
    onImageClick();
  };

  return (
    <div 
      className="relative aspect-[16/9] rounded shadow-lg overflow-hidden group bg-gray-700 cursor-pointer"
      onClick={() => onVideoClick(result)} // Click vào ảnh cũng sẽ mở video
    >
      <LazyLoadImage
        alt={result.frame_name || 'Search result'}
        src={result.frame_url}
        effect="blur"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        placeholderSrc="https://via.placeholder.com/320x180?text=..."
      />

        {/* Lớp phủ (Overlay) chỉ hiện khi hover */}
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Tên video/frame ở trên cùng */}
          <div className="text-white text-xs font-bold break-words">
            {result.video_name},{result.frame_name.replace(/\.webp$/i, '')}
          </div>

        {/* Hai icon ở dưới */}
        <div className="flex justify-between items-end">
          <button onClick={handleVideoIconClick} className="hover:scale-125 transition-transform">
            <SearchIcon />
          </button>
          <button onClick={handleImageIconClick} className="hover:scale-125 transition-transform">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultItem;