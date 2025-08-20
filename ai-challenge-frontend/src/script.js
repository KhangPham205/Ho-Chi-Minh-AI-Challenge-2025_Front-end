const BasicBtn = document.getElementById("basicSearchBtn");
const TemporalBtn = document.getElementById("temporalSearchBtn");
const BasicSearch = document.getElementById("BasicSearch");
const TemporalSearch = document.getElementById("TemporalSearch");
const searchBtn = document.getElementById("searchBtn");
const answers = document.getElementById("answers");

BasicBtn.addEventListener("click", () => {
  BasicSearch.classList.remove("hidden");
  TemporalSearch.classList.add("hidden");
  BasicBtn.classList.add("bg-blue-500", "text-white");
  BasicBtn.classList.remove("bg-gray-300");
  TemporalBtn.classList.add("bg-gray-300");
  TemporalBtn.classList.remove("bg-blue-500", "text-white");
});

TemporalBtn.addEventListener("click", () => {
  TemporalSearch.classList.remove("hidden");
  BasicSearch.classList.add("hidden");
  TemporalBtn.classList.add("bg-blue-500", "text-white");
  TemporalBtn.classList.remove("bg-gray-300");
  BasicBtn.classList.add("bg-gray-300");
  BasicBtn.classList.remove("bg-blue-500", "text-white");
});

// demo search: lấy nội dung và hiển thị
searchBtn.addEventListener("click", () => {
  let query = "";
  if (!BasicSearch.classList.contains("hidden")) {
    query = document.getElementById("queryBasic").value;
  } else {
    query = document.getElementById("queryTemporal").value;
  }

  answers.innerHTML = `<div class="bg-white p-2 rounded shadow">🔎 You searched: <b>${query}</b></div>`;
});
