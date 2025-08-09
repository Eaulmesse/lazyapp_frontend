"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2Icon } from "lucide-react"
import { useEffect, useState } from 'react';

const InputURL = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    
    

    const handleSubmit = () => {
        setIsLoading(true);
        fetch(`/api/audit?url=${url}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            });
    }

    return (
        
        <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="url" placeholder="URL de votre site" />

            {isLoading ? (
                <Button size="sm" disabled>
                    <Loader2Icon className="animate-spin" />
                    En cours d'audit...
                </Button>
            ) : (
                <Button type="submit" onClick={handleSubmit} variant="secondary">
                    Lancer l'audit
                </Button>
            )}

            {data && (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold">Résultat de l'audit</h1>
                    <p>{data}</p>
                </div>
            )}
        </div>
    );
}

export default InputURL;

