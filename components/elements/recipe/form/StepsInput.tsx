"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeSteps } from "@/zod/recipeSchema";
import { ListOrdered, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type Props = {
  defaultStepsValue?: RecipeSteps[];
};

export default function StepsInput({
  defaultStepsValue = [{ id: uuidv4(), step: "" }],
}: Props) {
  const [steps, setSteps] = useState<RecipeSteps[]>(defaultStepsValue);

  function addStep() {
    setSteps((prev) => [...prev, { id: uuidv4(), step: "" }]);
  }

  function deleteStep(targetId: string) {
    if (steps.length <= 1) {
      return toast.warning(
        "Tidak bisa menghapus, resep setidaknya memiliki 1 langkah pembuatan",
      );
    }
    setSteps((prev) => prev.filter((e) => e.id !== targetId));
  }
  return (
    <div>
      <h1 className="recipe-form-section-heading">
        <ListOrdered /> Langkah Pembuatan
      </h1>
      <section className="flex flex-col gap-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            <Input
              name="steps"
              defaultValue={step.step}
              placeholder="Langkah 1, Contoh: Panaskan minyak di wajan"
            />
            <Button
              variant="destructive"
              type="button"
              size="icon"
              className="size-12"
              onClick={() => deleteStep(step.id)}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </section>
      <Button
        variant="outline"
        className="mt-3"
        type="button"
        onClick={() => addStep()}
      >
        <Plus className="mr-2" />
        Tambah Langkah Pembuatan
      </Button>
    </div>
  );
}
