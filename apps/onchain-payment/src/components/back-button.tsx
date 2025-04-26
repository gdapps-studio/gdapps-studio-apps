import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const BackButton = () => (
  <Link href="/" className="block">
    <button className="flex items-center gap-2 cursor-pointer">
      <ArrowLeft className="cursor-pointer" />
      <span>Back</span>
    </button>
  </Link>
);
