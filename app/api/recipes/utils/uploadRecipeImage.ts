import { supabaseServer } from "@/lib/supabaseServer";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export async function uploadRecipeImage(
  image: File,
): Promise<{ publicUrl: string; filePath: string }> {
  try {
    const imageBuffer = await image.arrayBuffer();
    const fileBuffer = await sharp(Buffer.from(imageBuffer))
      .webp({
        quality: 80,
        nearLossless: true,
        effort: 6,
      })
      .toBuffer();

    const { storage } = await supabaseServer();

    const randomId = uuidv4();
    const filePath = `${randomId}.webp`;

    const uploadResult = await storage
      .from("recipes")
      .upload(filePath, fileBuffer, {
        contentType: "image/webp",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadResult.error) {
      throw new Error(`Upload gagal: ${uploadResult.error.message}`);
    }

    const { data: urlData } = await storage
      .from("recipes")
      .getPublicUrl(filePath);

    return {
      publicUrl: urlData.publicUrl,
      filePath: filePath,
    };
  } catch (error) {
    console.error("Error uploading recipe image:", error);

    if (error instanceof Error) {
      throw new Error(`Gagal upload gambar: ${error.message}`);
    }

    throw new Error("Terjadi kesalahan saat mengupload gambar");
  }
}
