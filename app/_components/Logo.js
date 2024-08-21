import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <h2 className="font-medium text-xl mr-10 text-center w-full">ACME</h2>
    </Link>
  );
}

export default Logo;
