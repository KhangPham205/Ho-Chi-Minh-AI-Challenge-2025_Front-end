// Overlay cho answerData
const answerData = [
  {
    video: "Video001.mp4",
    frame: "Frame #123",
    img: "https://picsum.photos/id/1011/300/200",
  },
  {
    video: "Video002.mp4",
    frame: "Frame #456",
    img: "https://picsum.photos/id/1012/300/200",
  },
  {
    video: "Video003.mp4",
    frame: "Frame #789",
    img: "https://picsum.photos/id/1013/300/200",
  },
  {
    video: "Video004.mp4",
    frame: "Frame #234",
    img: "https://picsum.photos/id/1014/300/200",
  },
  {
    video: "Video005.mp4",
    frame: "Frame #567",
    img: "https://picsum.photos/id/1015/300/200",
  },
  {
    video: "Video006.mp4",
    frame: "Frame #890",
    img: "https://picsum.photos/id/1016/300/200",
  },
];

const container = document.getElementById("answerData");

// Render tất cả answer
answerData.forEach((item) => {
  const div = document.createElement("div");
  div.className = "relative rounded shadow overflow-hidden";
  div.innerHTML = `
  <div class="absolute top-0 left-0 right-0 flex justify-between text-xs text-white 
              bg-black bg-opacity-50 px-2 py-1 opacity-30 hover:opacity-100 transition-opacity duration-300">
    <span>${item.video}</span>
    <span>${item.frame}</span>
  </div>
  <img src="${item.img}" class="w-full h-auto" />
`;
  container.appendChild(div);
});
