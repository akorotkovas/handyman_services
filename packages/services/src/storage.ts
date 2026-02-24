import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { randomUUID } from "crypto";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];
const ALLOWED_DOC_TYPES = ["application/pdf"];

type UploadResult = {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
};

export async function uploadImage(
  file: File,
  subdir: string = "photos"
): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Netinkamas failo formatas. Leidžiami: JPG, PNG, WebP");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Failas per didelis. Maksimalus dydis: 10MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Convert to WebP and optimize
  const optimized = await sharp(buffer)
    .webp({ quality: 80 })
    .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const fileName = `${randomUUID()}.webp`;
  const dir = path.join(UPLOAD_DIR, subdir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fileName), optimized);

  return {
    url: `/uploads/${subdir}/${fileName}`,
    fileName,
    fileSize: optimized.length,
    mimeType: "image/webp",
  };
}

export async function uploadDocument(
  file: File,
  subdir: string = "documents"
): Promise<UploadResult> {
  if (![...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES].includes(file.type)) {
    throw new Error("Netinkamas failo formatas");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Failas per didelis. Maksimalus dydis: 10MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop() ?? "bin";
  const fileName = `${randomUUID()}.${ext}`;
  const dir = path.join(UPLOAD_DIR, subdir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fileName), buffer);

  return {
    url: `/uploads/${subdir}/${fileName}`,
    fileName,
    fileSize: file.size,
    mimeType: file.type,
  };
}
