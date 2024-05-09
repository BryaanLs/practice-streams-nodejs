import { pipeline } from "stream/promises";
import { Transform } from "stream";
import { createWriteStream } from "fs";
import ytdl from "ytdl-core";

const escritor = createWriteStream("./4kVideo.mp4");
const processChunk = new Transform();

(async () => {
  const url = "https://www.youtube.com/watch?v=0mFBywg8rNY";
  try {
    const streamTeste = ytdl(url, {
      quality: "highestvideo",
      filter: "audioandvideo",
      format: "mp4",
      liveBuffer: 1000,
    });
    processChunk._transform = (chunk, enc, callback) => {
      callback(null, chunk);
    };

    await pipeline(streamTeste, processChunk, escritor);

    console.log("Download concluído!");
  } catch (error) {
    console.error(error);
  }
})();
