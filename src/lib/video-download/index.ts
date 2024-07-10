import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import ytdl from "@distube/ytdl-core";
import path from "path";
type Folders = "GO" | "DevOps" | "React Native" | "React" | "Node";
async function downloadVideo(
  link: string,
  nameVideo: string,
  folderName: Folders
): Promise<void> {
  const videoPath = path.resolve(
    "src",
    "lib",
    "video-download",
    "downloads",
    folderName,
    `${nameVideo}.mp4`
  );

  const video = createWriteStream(videoPath);
  try {
    const dowloadOptions: ytdl.downloadOptions = {
      filter: "audioandvideo",
      quality: "highestvideo",
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

const goClass: Array<string> = [
  "https://youtu.be/silZZ2QVmd8",
  "https://youtu.be/TpdLBsLa5F0",
  "https://youtu.be/gNX9E3xBUCA",
];
const reactNativeClass: Array<string> = [
  "https://youtu.be/YT7lJM48KuI",
  "https://youtu.be/otZPd9QNoiY",
  "https://youtu.be/uZg6tWmUuaU",
];
const reactjsClass: Array<string> = [
  "https://youtu.be/RdGdpkXS6nU",
  "https://youtu.be/c6FHaNHz6rk",
  "https://youtu.be/d6RwhwKHTtU",
];
const nodejsClass: Array<string> = [
  "https://youtu.be/wq6cDt6CUPI",
  "https://youtu.be/AcjvHqgrfzw",
  "https://youtu.be/-yN1X-yaE7Y",
];
const devopsClass: Array<string> = [
  "https://youtu.be/EvuxQrBVtaY",
  "",
  "https://youtu.be/--_m6ibt3AY",
];

await Promise.all(
  goClass.map((link, i) => downloadVideo(link, `nlw-devops-aula${i + 1}`, "GO"))
);
await Promise.all(
  reactNativeClass.map((link, i) =>
    downloadVideo(link, `nlw-devops-aula${i + 1}`, "React Native")
  )
);
await Promise.all(
  reactjsClass.map((link, i) =>
    downloadVideo(link, `nlw-devops-aula${i + 1}`, "React")
  )
);
await Promise.all(
  nodejsClass.map((link, i) =>
    downloadVideo(link, `nlw-devops-aula${i + 1}`, "Node")
  )
);
await Promise.all(
  devopsClass.map((link, i) =>
    downloadVideo(link, `nlw-devops-aula${i + 1}`, "DevOps")
  )
);

// await downloadVideo("https://www.youtube.com/watch?v=_Td7JjCTfyc", "saida");
