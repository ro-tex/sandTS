import * as fs from "fs";
import { StringDecoder, NodeStringDecoder } from "string_decoder";
import { Readable } from "stream";

const buffers = false;
if (buffers) {
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
    stringDecoder: NodeStringDecoder | null = null
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

const streams = true;
if (streams) {
  // Reading from streams:
  const stream = fs.createReadStream("./file.txt", {
    encoding: "utf8", // this turns the chunk from a Buffer (or object) to a String
    autoClose: true
  });

  stream.on("data", chunk => {
    console.log("> New chunk of data:", chunk.length);
  });
  stream.on("end", () => stream.close()); // we need this if we don't autoClose the stream

  // Writing to streams:
  const stream2 = new Readable();

  stream2.push("Hello");
  stream2.push("World!");
  stream2.push(null); // signals that we're done sendig data

  stream2.on("data", chunk => {
    console.log(chunk.toString());
  });
}
