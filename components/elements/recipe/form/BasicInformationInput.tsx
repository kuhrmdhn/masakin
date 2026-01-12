import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import CategoryInput from "./CategoryInput";

const basicInformationFields = [
  {
    name: "title",
    label: "Nama Resep",
    placeholder: "Contoh: Nasi Goreng Spesial",
    type: "text",
  },
  {
    name: "description",
    label: "Deskripsi",
    placeholder:
      "Ceritakan sedikit tentang resep ini, kapan cocok disajikan, atau sejarahnya.",
    type: "text",
  },
  {
    name: "serving",
    label: "Porsi (Orang)",
    placeholder: "Contoh: 4",
    type: "number",
  },
  {
    name: "duration",
    label: "Durasi memasak (Menit)",
    placeholder: "Contoh: 60",
    type: "number",
  },
] as const;

type FieldName = (typeof basicInformationFields)[number]["name"];

type InitialData = {
  [key in FieldName]?: string | number;
};

interface Props {
  initialData?: InitialData;
}

export default function BasicInformationInput({ initialData = {} }: Props) {
  return (
    <div>
      <h1 className="recipe-form-section-heading">
        <Info /> Informasi Dasar
      </h1>
      <section className="flex flex-col gap-5">
        {basicInformationFields.map((field, index) => (
          <div key={index}>
            <Label className="mb-1" htmlFor={field.name}>
              {field.label}
            </Label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              id={field.name}
              name={field.name}
              required
              defaultValue={initialData[field.name]?.toString() || ""}
            />
          </div>
        ))}
      </section>
      <CategoryInput />
    </div>
  );
}
