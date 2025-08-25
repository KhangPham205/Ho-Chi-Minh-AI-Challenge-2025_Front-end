// src/components/AsrResultGroup.jsx
import ResultItem from './ResultItem';

function AsrResultGroup({ videoGroup, onVideoClick, onImageClick }) {
  return (
    <div className="col-span-full mb-6">
      {/* Tiêu đề cho mỗi video */}
      <h2 className="text-xl font-bold text-white mb-3">{videoGroup.video_name}</h2>

      {/* Lặp qua từng phân đoạn (segment) */}
      {videoGroup.segments.map((segment, index) => (
        <div key={index} className="mb-4 pl-4 border-l-2 border-gray-700">
          {/* Lời thoại của segment */}
          <p className="text-md text-gray-300 mb-2">{segment.asr_text}</p>
          
          {/* Lưới hiển thị các frame của segment */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {segment.frames.map(frame => (
              <ResultItem 
                key={frame.id}
                // Tạo một object result hoàn chỉnh cho ResultItem
                result={{
                  ...frame,
                  video_name: videoGroup.video_name,
                  frame_name: frame.frame_name
                }}
                onVideoClick={onVideoClick}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AsrResultGroup;