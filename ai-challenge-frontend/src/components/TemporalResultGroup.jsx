// src/components/TemporalResultGroup.jsx
import ResultItem from './ResultItem';

// Bảng màu cho các sự kiện khác nhau
const eventColors = ['border-red-500', 'border-blue-500', 'border-green-500'];

function TemporalResultGroup({ videoGroup, onVideoClick, onImageClick }) {
  const { video_name, best_sequence } = videoGroup;
  
  return (
    <div className="col-span-full mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-white">{video_name}</h2>
        <span className="text-sm font-semibold text-yellow-400">
          Total Score: {best_sequence.total_score.toFixed(4)}
        </span>
      </div>
      
      {/* Hiển thị chuỗi các frame sự kiện */}
      <div className="flex items-center space-x-6 p-6 bg-gray-900 rounded-lg overflow-x-auto">
        {best_sequence.events.map((event, index) => (
          <div key={event.id} className={`flex-shrink-0 w-64 h-40 border-2 ${eventColors[event.event_index % 3]} rounded-lg`}>
            <ResultItem 
                result={{ ...event, video_name, frame_name: event.frame_name }}
                onVideoClick={onVideoClick}
                onImageClick={onImageClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemporalResultGroup;