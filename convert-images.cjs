const sharp = require("sharp");
const path = require("path");

const images = ["customer", "vendor", "rider"];

async function convertImages() {
  for (const name of images) {
    const input = path.join(__dirname, "assets", "images", `${name}.png`);

    const output = path.join(
      __dirname,
      "assets",
      "images",
      `${name}-fixed.png`,
    );

    await sharp(input).png().toFile(output);

    console.log(`✅ Converted: ${name}`);
  }
}

convertImages().catch(console.error);
