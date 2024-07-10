import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import ytdl from "ytdl-core";

async function downloadVideo(link: string, nameVideo: string): Promise<void> {
  const video = createWriteStream(`${nameVideo}.mp4`);
  try {
    const dowloadOptions: ytdl.downloadOptions = {
      filter: (format) => format.container === "mp4",
      quality: "highest",
      liveBuffer: 1000,
    };

    await pipeline(ytdl(link, dowloadOptions), video);
    console.log("Download concluido");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Erro no download");
      console.table({
        errorName: err.name,
        message: err.message,
      });
    } else {
      console.error(err);
    }
  }
}

await downloadVideo("https://www.youtube.com/watch?v=4YyV4S_IeO8", "saida");
