"use client";

import { useRouter, usePathname } from "next/navigation";

function JobListButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleJobList = () => {
    router.push("/joblist");
  };

  const isActive = pathname === "/joblist";

  return (
    <button
      className={`text-black h-1/2 font-light py-1 px-4 hover:text-primary focus:outline-none transform transition-transform duration-150 ease-in-out active:scale-95 ${
        isActive
          ? "underline underline-offset-8 decoration-0 text-cyan-800"
          : ""
      }`}
      onClick={handleJobList}
    >
      Job List
    </button>
  );
}

export default JobListButton;
