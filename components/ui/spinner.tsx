export default function Spinner({ size = 16 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-t-white"
      style={{ width: size, height: size, borderWidth: size / 8 }}
    />
  );
}