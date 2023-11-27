import { XMarkIcon, Bars2Icon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: sessionData } = useSession();
  if (sessionData) {
    return (
      <nav className="absolute left-0 top-0 z-10 flex w-full flex-col items-center justify-between gap-8 bg-slate-50 bg-transparent px-2 backdrop-blur-md md:fixed md:flex-row  md:gap-0">
        <div className="font-poppins flex w-full items-center justify-between text-xl font-bold tracking-tight text-neutral-100 md:text-4xl">
          <Link href="/">BrainSprout</Link>
          <div className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XMarkIcon width={30} /> : <Bars2Icon width={30} />}
          </div>
        </div>
        <ul
          className={
            '${!isOpen && "hidden md:flex" flex flex-col gap-8 text-neutral-100 md:flex-row md:items-center md:justify-end md:gap-20'
          }
        >
          <Link href="/entries">Entries</Link>
          <Link href="/write">Write</Link>
          <button className="w-min" onClick={() => void signOut()}>
            Logout
          </button>
        </ul>
      </nav>
    );
  }
};

export default Navigation;
