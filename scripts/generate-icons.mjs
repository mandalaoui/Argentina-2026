const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

function createIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Argentina blue background
  ctx.fillStyle = "#74ACDF";
  ctx.fillRect(0, 0, size, size);

  // White horizontal stripes (Argentina flag style)
  ctx.fillStyle = "#ffffff";
  const stripeH = size / 3;
  ctx.fillRect(0, stripeH, size, stripeH);

  // Sun symbol (simplified circle)
  ctx.fillStyle = "#F6C90E";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.13, 0, Math.PI * 2);
  ctx.fill();

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);
  console.log("Created:", outputPath);
}

const iconsDir = path.join(__dirname, "public", "icons");
createIcon(192, path.join(iconsDir, "icon-192.png"));
createIcon(512, path.join(iconsDir, "icon-512.png"));
