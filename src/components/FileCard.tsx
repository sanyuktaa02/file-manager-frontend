interface FileCardProps {
  name: string;
  size: string;
}

export default function FileCard({ name, size }: FileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow transition">
      <div className="h-32 bg-gray-100 rounded mb-3"></div>

      <p className="text-sm font-medium truncate">{name}</p>
      <p className="text-xs text-gray-500">{size}</p>
    </div>
  );
}
