import * as fs from "fs";
import { StringDecoder } from "string_decoder";
import { Readable } from "stream";

const enableBuffers = false;
if (enableBuffers) {
  const buffers = [
    Buffer.from("Hello "),
    Buffer.from([0b11110000, 0b10011111]),
    Buffer.from([0b10001100, 0b10001110]),
    Buffer.from(" world!")
  ];

  const stringDecoder = new StringDecoder("utf8");

  const result1 = buffers.reduce(
    (result, buffer) => `${result}${stringDecoder.write(buffer)}`,
    ""
  );
  const result2 = buffers.map(b => stringDecoder.write(b)).join("");
  const result3 = buffer2string(buffers, stringDecoder);

  function buffer2string(
    buf: Buffer[],
    stringDecoder: StringDecoder | null = null
  ): string {
    stringDecoder = stringDecoder || new StringDecoder("utf8");
    let res: string[] = [];
    let n = buf.length;
    for (let i = 0; i < n; i++) {
      res.push(stringDecoder.write(buf[i]));
    }
    return res.join("");
  }

  console.log(result1, result2, result3); // Hello 🌎 world! x3
}

const enableStreams = true;
if (enableStreams) {
  // Reading from streams:
  const readStream = fs.createReadStream("./file.txt", {
    encoding: "utf8", // this turns the chunk from a Buffer (or object) to a String
    autoClose: true
  });
  // all readabel streams are "paused" by default until we attach a handler.
  // we can switch them to "flowing" by calling stream.resume();
  // we can also explicitly stream.pause() them and resume() when we want.
  readStream.on("data", chunk => {
    console.log(
      "> New chunk: length %d, start '%s'...",
      chunk.length,
      chunk.substr(0, 17)
    );
  });
  readStream.on("end", () => readStream.close()); // we need this if we don't autoClose the stream

  // Writing to a readable stream:
  const stream2 = new Readable();
  stream2.push("Hello");
  stream2.push("World!");
  stream2.push(null); // signals that we're done sendig data. we NEED this!

  stream2.on("data", chunk => {
    console.log(chunk.toString());
  });

  const writeStream = fs.createWriteStream("./file_hello.txt");
  writeStream.write("Hello world!", () => {
    console.log("data written...");
  });
  writeStream.on("finish", () => {
    console.log("All the data is transmitted");
  });
  writeStream.end(); // optional?

  const r = fs.createReadStream("./file.txt");
  const w = fs.createWriteStream("./file_out.txt");
  r.on("data", chunk => {
    w.write(chunk);
  });
}
