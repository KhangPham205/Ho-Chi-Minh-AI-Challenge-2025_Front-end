// Overlay cho answerData
// ans.js
const answerData = [
  {
    video: "Video001.mp4",
    frame: "Frame #123",
    img: "https://picsum.photos/id/1011/300/200",
    url_video: "sample.mp4",
    timestamp_ms: 12000,
  },
  {
    video: "Video002.mp4",
    frame: "Frame #456",
    img: "https://picsum.photos/id/1012/300/200",
    url_video: "sample.mp4",
    timestamp_ms: 25000,
  },
];

const container = document.getElementById("answerData");

// Render tất cả answer
answerData.forEach((item, index) => {
  const div = document.createElement("div");

  div.className = "relative rounded shadow overflow-hidden group";
  div.style.backgroundColor = "#fff"; // nền thumbnail nếu muốn

  div.innerHTML = `
    <!-- overlay top -->
    <div class="absolute top-0 left-0 right-0 text-xs text-white 
                bg-black bg-opacity-50 px-2 py-1 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
      ${item.video}, ${item.frame}
    </div>

    <!-- thumbnail -->
    <img src="${item.img}" class="w-full h-auto cursor-pointer" onclick="openVideo('${item.url_video}', ${item.timestamp_ms})" />

    <!-- nút trái -->
    <div class="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button onclick="openVideo('${item.url_video}', ${item.timestamp_ms})" 
              class="text-white p-2 rounded-full text-xs" style="background-color:#F98A8A;">🔎</button>
    </div>

    <!-- nút phải -->
    <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button onclick="viewFrame('${item.img}')" 
              class="text-white p-2 rounded-full text-xs" style="background-color:#74B1FB;">🔍</button>
    </div>
  `;

  container.appendChild(div);
});
