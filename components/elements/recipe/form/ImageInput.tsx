"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  className?: string;
  initialImage?: string;
  altText?: string;
};

export default function ImageInput({
  altText = "New recipe image",
  className = "",
  initialImage = "",
}: Props) {
  const backupImage = initialImage;
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState(backupImage);

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileUrl = URL.createObjectURL(files[0]);
      setPreviewImage(fileUrl);
    }
  }

  function resetImage() {
    setPreviewImage(backupImage);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div>
      <h1 className="recipe-form-section-heading">
        <ImageIcon />
        Foto Resep
      </h1>
      <div className={`relative h-96 w-72 ${className}`}>
        {previewImage ? (
          <Image
            height={1080}
            width={1080}
            src={previewImage}
            alt={altText}
            className="object-cover object-center size-full rounded-lg"
          />
        ) : (
          <section className="w-full h-full rounded-lg border border-gray-300 flex flex-col gap-5 justify-center items-center">
            <Image
              width={1080}
              height={1080}
              alt="default image picture"
              src="/default-image-pic.svg"
              className="w-2/5"
            />
            <p className="text-gray-500 font-medium">Tidak ada foto dipilih</p>
          </section>
        )}
        {previewImage !== backupImage && (
          <Button
            className="absolute top-0 right-0 z-12"
            size="icon-lg"
            variant="destructive"
            onClick={() => resetImage()}
          >
            <Trash />
          </Button>
        )}
        <Label className="size-full rounded-lg opacity-0 hover:opacity-100 hover:bg-[rgba(0,0,0,0.5)] duration-200 absolute top-0 z-10">
          <Input
            onChange={(e) => handleChangeImage(e)}
            ref={inputRef}
            name="image"
            className="hidden w-0 h-0"
            type="file"
            accept="image/*"
          />
          <ImagePlus
            size={48}
            className="text-white relative right-1/2 translate-x-1/2"
          />
        </Label>
      </div>
    </div>
  );
}
