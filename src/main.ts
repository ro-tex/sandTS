import touch from "./utils/touch";
import cat from "./utils/cat";

const command = process.argv[2];
const path = process.argv[3];

if (command && path) {
  switch (command) {
    case "touch": {
      touch(path);
      break;
    }
    case "cat": {
      cat(path);
      break;
    }
    default: {
      console.log("Unknown command");
    }
  }
} else {
  console.log("Command missing");
}
