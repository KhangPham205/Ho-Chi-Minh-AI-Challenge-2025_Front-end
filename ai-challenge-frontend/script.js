const TextBtn = document.getElementById("textSearchBtn");
const TemporalBtn = document.getElementById("temporalSearchBtn");
const ImageBtn = document.getElementById("imageSearchBtn");

const TextSearch = document.getElementById("TextSearch");
const TemporalSearch = document.getElementById("TemporalSearch");
const ImageSearch = document.getElementById("ImageSearch");

const searchBtn = document.getElementById("searchBtn");
const answers = document.getElementById("answers");

const translateBtn = document.getElementById("translateBtn"); // 👈 thêm dòng này

function switchSearchMode(mode) {
  // Ẩn tất cả panel
  TextSearch.classList.add("hidden");
  TemporalSearch.classList.add("hidden");
  ImageSearch.classList.add("hidden");

  // Reset style nút
  [TextBtn, TemporalBtn, ImageBtn].forEach(btn => {
    btn.classList.remove("bg-[#E5BEB5]", "text-white");
    btn.classList.add("bg-gray-300");
  });

  // Hiện đúng panel & active nút
  if (mode === "text") {
    TextSearch.classList.remove("hidden");
    TextBtn.classList.add("bg-[#E5BEB5]", "text-white");
    TextBtn.classList.remove("bg-gray-300");
    translateBtn.classList.remove("hidden"); // 👈 hiện Translate
  } else if (mode === "temporal") {
    TemporalSearch.classList.remove("hidden");
    TemporalBtn.classList.add("bg-[#E5BEB5]", "text-white");
    TemporalBtn.classList.remove("bg-gray-300");
    translateBtn.classList.remove("hidden"); // 👈 hiện Translate
  } else if (mode === "image") {
    ImageSearch.classList.remove("hidden");
    ImageBtn.classList.add("bg-[#E5BEB5]", "text-white");
    ImageBtn.classList.remove("bg-gray-300");
    translateBtn.classList.add("hidden"); // 👈 ẩn Translate
  }
}

// Event listener
TextBtn.addEventListener("click", () => switchSearchMode("text"));
TemporalBtn.addEventListener("click", () => switchSearchMode("temporal"));
ImageBtn.addEventListener("click", () => switchSearchMode("image"));

// Mặc định mở TextSearch
switchSearchMode("text");

// slider
const kRange = document.getElementById("kRange");
const kValue = document.getElementById("kValue");

kRange.addEventListener("input", () => {
  kValue.textContent = kRange.value;
});

// Hàm gọi API
async function callApi(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API error:", error);
    return null;
  }
}

// Handle Search
searchBtn.addEventListener("click", async () => {
  console.log("🔍 Search button clicked!");

  const query = document.getElementById("queryBasic").value;   // text query
  const k = document.getElementById("kRange").value;          // top-k
  const ocrFilter = document.getElementById("ocrFilter").value;
  const asrFilter = document.getElementById("asrFilter").value;

  const payload = {
    query,
    k: parseInt(k),
    filters: {
      ocr: ocrFilter,
      asr: asrFilter
    }
  };

  const result = await callApi("http://localhost:8080/api/search", payload);

  if (result && result.data) {
    answers.innerHTML = ""; // clear cũ
    result.data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("bg-white", "p-2", "rounded", "shadow");
      div.innerText = item.title || JSON.stringify(item);
      answers.appendChild(div);
    });
  }
});

// Handle Translate
// translateBtn.addEventListener("click", async () => {
//   console.log("🌍 Translate button clicked!");

//   const query = document.getElementById("queryBasic").value;

//   const payload = { text: query };
//   const result = await callApi("http://localhost:8080/api/translate", payload);

//   if (result && result.translation) {
//     alert("Bản dịch: " + result.translation);
//   }
// });