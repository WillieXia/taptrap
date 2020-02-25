const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    console.log(mediaRecorder.mimeType);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          var h = new Howl({
            src: audioUrl,
            format: ['webm']
          });
          const play = () => h.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

let recorder = null;
let audio = null;

const recordStop = async () => {
  if (recorder) {
    audio = await recorder.stop();
    recorder = null;
    document.querySelector("#record-btn").textContent = "Record";
    document.querySelector("#play-btn").removeAttribute("disabled");
  } else {
    recorder = await recordAudio();
    recorder.start();
    document.querySelector("#record-btn").textContent = "Stop";
  }
};

const playAudio = () => {
  if (audio && typeof audio.play === "function") {
    audio.play();
  }
};