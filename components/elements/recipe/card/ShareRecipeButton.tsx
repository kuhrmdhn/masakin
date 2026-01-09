"use client"
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareRecipeButton() {
    async function handleShareRecipeUrl() {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        toast.info("Tautan disalin!");
    }
    return (
        <Button
            className="[&_svg]:size-5!"
            onClick={() => handleShareRecipeUrl()} variant="outline"
        >
            <Share />
            Bagikan
        </Button>)
}
