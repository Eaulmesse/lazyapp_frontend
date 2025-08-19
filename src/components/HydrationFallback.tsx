import { useClientOnly } from "@/lib/hooks/useHydration";

interface HydrationFallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export default function HydrationFallback({ 
  children, 
  fallback,
  className = "animate-pulse bg-gray-800 rounded-lg"
}: HydrationFallbackProps) {
  const isClient = useClientOnly();

  if (!isClient) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className={className}></div>
    );
  }

  return <>{children}</>;
}
