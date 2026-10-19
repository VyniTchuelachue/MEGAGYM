// Turns the club's original photos (photos/club/*.jpg) into web sizes in
// public/images/club/, and records the widths made in src/data/photo-sizes.json
// so <Photo> can offer the browser the right file. Run: npm run images
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'photos', 'club');
const outputDir = path.join(root, 'public', 'images', 'club');
const sizesFile = path.join(root, 'src', 'data', 'photo-sizes.json');
const WIDTHS = [640, 1280, 1920];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const sizes = {};
const files = (await readdir(sourceDir)).filter((file) => /\.jpe?g$/i.test(file)).sort();

for (const file of files) {
  const name = path.parse(file).name;
  const source = path.join(sourceDir, file);
  const { width: original } = await sharp(source).metadata();
  // Never enlarge: a photo narrower than a step stops at its own width.
  const widths = [...new Set(WIDTHS.map((width) => Math.min(width, original)))];
  for (const width of widths) {
    await sharp(source)
      .rotate()
      .resize({ width })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(outputDir, `${name}-${width}.jpg`));
  }
  sizes[name] = widths;
  console.log(`${name}: ${widths.join(', ')}`);
}

await writeFile(sizesFile, `${JSON.stringify(sizes, null, 2)}\n`);
console.log(`${files.length} photos → public/images/club/`);
