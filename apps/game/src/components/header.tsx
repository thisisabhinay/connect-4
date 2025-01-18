import { Logo } from "@repo/assets/image";
import Image from "next/image";
import { BackgroundMusic } from "./background-music";

export function Header() {
  return (
    <div className="relative flex flex-col-reverse lg:flex-col">
      <div className="flex items-center justify-center lg:py-10">
        <Image
          src={Logo.src}
          width={Math.round(Logo.width / 1.5)}
          height={Math.round(Logo.height / 1.5)}
          alt="Connect4 Logo"
        />
      </div>
      <div className="flex flex-row-reverse items-center gap-6 px-6 lg:absolute top-0 w-full justify-center lg:justify-start">
        <a
          href="https://github.com/thisisabhinay/connect-4"
          target="_blank"
          className="nes-icon github is-large"
        />
        <BackgroundMusic />
      </div>
    </div>
  );
}
