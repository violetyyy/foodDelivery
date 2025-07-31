const fs = require("fs");
const path = require("path");

function printTree(dir, indent = "") {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (file === "node_modules") continue; // Skip node_modules

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    console.log(indent + "|-- " + file);

    if (stat.isDirectory()) {
      printTree(filePath, indent + "    ");
    }
  }
}

const dirToPrint = process.argv[2] || ".";
printTree(dirToPrint);
