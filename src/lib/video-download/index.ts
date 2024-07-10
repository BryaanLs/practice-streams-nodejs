import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import ytdl from "@distube/ytdl-core";
import path from "path";

type Folders = "GO" | "DevOps" | "React Native" | "React" | "Node";
async function downloadVideo(
  link: string,
  folderName?: Folders,
  nameVideo?: string
): Promise<void> {
  try {
    const { player_response, ...infos } = await ytdl.getBasicInfo(link);
    const videoPath = path.resolve(
      "src",
      "lib",
      "video-download",
      "downloads",
      folderName ?? "videos",
      `${player_response.videoDetails.title}.mp4`
    );
    const format = infos.formats.find((item) => {
      if (
        item.qualityLabel === "1080p60" &&
        item.mimeType?.includes("video/mp4")
      )
        return item;
    });
    const video = createWriteStream(videoPath);
    const dowloadOptions: ytdl.downloadOptions = {
      filter: "audioandvideo",
      quality: "highestvideo",
      format: format,
    };

    await pipeline(ytdl(link, dowloadOptions), video);
    console.log(`Download concluido: ${player_response.videoDetails.title}`);
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

const promises = [
  goClass.map((link) => downloadVideo(link, "GO")),
  reactNativeClass.map((link) => downloadVideo(link, "React Native")),
  reactjsClass.map((link) => downloadVideo(link, "React")),
  nodejsClass.map((link) => downloadVideo(link, "Node")),
  devopsClass.map((link) => downloadVideo(link, "DevOps")),
];

await Promise.all(promises);

// await downloadVideo("https://www.youtube.com/watch?v=_Td7JjCTfyc", "saida");
