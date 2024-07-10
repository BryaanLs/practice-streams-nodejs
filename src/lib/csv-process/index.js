import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";
const read = createReadStream("./input.csv");
const writer = createWriteStream(".output.csv");

// id,name,age,score
const processChunk = new Transform({
  transform(chunk, encoding, callback) {},
});

read.on("data", (chunk) => {
  processChunk._write(chunk);
});

read.on("end", () => {
  console.log("Fim da leitura!");
});

read.on("error", (err) => {
  console.log("Ocorreu um erro: ", err);
});

const teste = "";
