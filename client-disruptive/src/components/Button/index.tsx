export default function Button({
  onClick,
  children,
  bgColor = 'bg-indigo-500',
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  bgColor?: string;
}) {
  return (
    <button
      className={`w-full ${bgColor} px-4 py-2 rounded-md text-center hover:bg-gray-300 hover:text-gray-800 text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

