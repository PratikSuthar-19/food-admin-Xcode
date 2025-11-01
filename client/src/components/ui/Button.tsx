import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" |"destructive";
}

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const base =
    "w-full py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none border";

  const variants = {
    primary:
      "bg-white text-black border-zinc-700 hover:bg-zinc-200 active:scale-[0.98]",
    outline:
      "bg-transparent text-white border-zinc-800 hover:bg-zinc-900 active:scale-[0.98]",
    destructive: 
       "bg-red-600 hover:bg-red-700 text-white",
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
};
