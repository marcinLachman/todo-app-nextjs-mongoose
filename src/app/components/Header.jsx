import Link from "next/link";

import { BsArrowRightShort } from "react-icons/bs";

export default function Header() {
  return (
    <header className="flex justify-around items-center py-4">
      <Link className="text-sm md:text-xl lg:text-2xl font-bold" href={"/"}>
        Aplikacja ToDo
      </Link>
      <Link href={"/pages/add-new-task"}>
        <div className="flex items-center">
          <p className="text-sm md:text-md lg:text-xl">Dodaj zadanie</p>
          <BsArrowRightShort size={36} />{" "}
        </div>
      </Link>
    </header>
  );
}
