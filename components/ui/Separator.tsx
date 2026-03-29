type SeparatorProps = {
  className?: string;
};

export default function Separator({ className }: SeparatorProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-primary-950 text-gray-400">OR</span>
      </div>
    </div>
  );
}
