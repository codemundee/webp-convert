const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const OUTPUT_DIR = "./OUTPUT";
const INPUT_DIR = "./INPUT";

if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}

fs.mkdirSync(OUTPUT_DIR);

let imgs = [];

const convertToWebp = (img, index) => {
  const imgName = path.parse(img).name;
  sharp(`${INPUT_DIR}/${img}`).webp().toFile(`${OUTPUT_DIR}/${imgName}.webp`);
};

fs.readdir(INPUT_DIR, (err, files) => {
  imgs = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === ".png" || ext === ".jpg" || ext === ".jpeg";
  });
  // For each image file found, call the convertToWebp function
  imgs.forEach((img, i) => convertToWebp(img, i));
});
