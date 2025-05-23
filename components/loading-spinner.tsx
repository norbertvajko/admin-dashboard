import Spinner from "@/components/ui/spinner";

interface LoadingSpinnerProps {
  size?: number;
}

export default function LoadingSpinner({ size = 48 }: LoadingSpinnerProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Spinner size={size} />
      </div>
    </div>
  );
}
