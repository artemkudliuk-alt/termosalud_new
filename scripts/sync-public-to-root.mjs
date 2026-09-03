import fs from 'fs';
import path from 'path';

// 1. Copy all files directly in public/ to root
const publicFiles = fs.readdirSync('public');
for (const file of publicFiles) {
  const srcPath = path.join('public', file);
  const destPath = file;
  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied public/${file} -> ./${file}`);
  }
}

// 2. Update vercel.json with clean rewrites
const vercelConfig = {
  version: 2,
  buildCommand: "npm run build",
  outputDirectory: ".",
  rewrites: [
    {
      source: "/wp-content/:path*",
      destination: "/public/wp-content/:path*"
    },
    {
      source: "/about-us",
      destination: "/about-us/index.html"
    },
    {
      source: "/zionic",
      destination: "/zionic/index.html"
    },
    {
      source: "/linfopress",
      destination: "/linfopress/index.html"
    }
  ]
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('Successfully synced public files to root and updated vercel.json');
