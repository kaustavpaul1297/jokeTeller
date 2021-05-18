const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// VoiceRSS Javascript SDK
// Passing joke to voiceRSS
// Disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
function tellMe(joke) {
  console.log("Tell me:", joke);
  VoiceRSS.speech({
    key: "4539dc1e256840bc95c2e552ba43e1e8",
    src: joke,
    hl: "en-gb",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
// Get Jokes from JokeAPI

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //text to speech
    tellMe(joke);
    //Disable button
    toggleButton();
  } catch (e) {
    console.log("Oops", e);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
