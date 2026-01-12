import { RecipeIngredients, RecipeSteps } from '@/zod/recipeSchema'

type Props = {
    ingredients: Omit<RecipeIngredients, 'id'>[]
    steps: Omit<RecipeSteps, 'id'>[]
}

export default function RecipeIngredientsAndSteps({ ingredients, steps }: Props) {
    return (
        <section className="flex flex-col gap-5 lg:gap-0 lg:flex-row h-fit mt-5 lg:mt-10">
            <div className="w-full lg:w-1/3">
                <section className="sticky top-20">
                    <h1 className="font-semibold text-xl mb-4">Bahan - bahan</h1>
                    <ol className="flex flex-col gap-2">
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <span className="font-semibold mr-2">
                                    {ingredient.quantity}
                                </span>
                                {ingredient.name}
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
            <div className="w-full lg:w-2/3">
                <section className="sticky top-20">
                    <h1 className="font-semibold text-xl mb-4">Langkah - langkah</h1>
                    <ol className="flex flex-col gap-2">
                        {steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                                {" "}
                                <div className="shrink-0 size-8 rounded-full  bg-primary  flex  items-center justify-center text-xs text-white">
                                    {index + 1}
                                </div>
                                <span className="flex-1">{step.step}</span>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </section>
    )
}
