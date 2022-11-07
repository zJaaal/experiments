import fetch from "node-fetch";

console.clear();

//A fetch client, where you just have to initialize with the base url and the init options, like header keys
//Then you can just call the methods you want with the options you want

function createFetchClient(url, init) {
  this.get = (endpoint, options) =>
    fetch(url + endpoint, { ...init, ...options, method: "GET" });

  this.post = (endpoint, options) =>
    fetch(url + endpoint, { ...init, ...options, method: "POST" });

  this.put = (endpoint, options) =>
    fetch(url + endpoint, { ...init, ...options, method: "PUT" });

  this.delete = (endpoint, options) =>
    fetch(url + endpoint, { ...init, ...options, method: "DELETE" });

  return this;
}

const fetchData = new createFetchClient(
  "https://deezerdevs-deezer.p.rapidapi.com/",
  {
    //This key doesn't exist anymore so...
    headers: {
      "X-RapidAPI-Key": "2b94937307mshdb7bb4e210abe30p104c02jsnc6918c8ed801",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  }
);

fetchData
  .get("playlist/1868167046")
  .then((res) => res.json())
  .then((data) => console.log(data));

fetchData
  .get("artist/27")
  .then((res) => res.json())
  .then((data) => console.log(data));

fetchData
  .get("album/294609352")
  .then((res) => res.json())
  .then((data) => console.log(data));

fetchData
  .get("track/3135553")
  .then((res) => res.json())
  .then((data) => console.log(data));
