const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const youtube = document.getElementById("youtube");
const apiURL = "https://api.lyrics.ovh";

// Event Listener

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("É necessário informar um termo para a pesquisa");
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

// Functions

async function searchSongs(term) {
  const response = await fetch(`${apiURL}/suggest/${term}`);
  const data = await response.json();
  showData(data);
}
function showData(data) {
  let output = "";
  data.data.forEach((song) => {
    output += `
        <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Lyrics</button>
    </li>`;
  });

  result.innerHTML = `
  <ul  class="songs">
  ${output}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick = "getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick = "getMoreSongs('${data.next}')">Next</button>`
          : ""
      }`;
  } else {
    more.innerHTML = "";
  }
}
function takeToYoutube(artist) {
  window.open(
    `https://www.youtube.com/results?search_query=${artist}`,
    "width=1000"
  );
}
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle} </h2> 
  
  <div id="youtube" onclick = "takeToYoutube('${artist}')">YouTube</div> 
  <br> 
  <span>${lyrics}</span>`;
  more.innerHTML = "";
}
