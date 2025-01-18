import { Logo } from "@repo/assets/image";
import Image from "next/image";
import { BackgroundMusic } from "./background-music";
import Link from "next/link";
/**
 * @param none This component doesn't accept any props
 * @returns JSX.Element A responsive header with dynamic logo sizing and navigation items
 *
 * A responsive header with two key sections:
 * - Main logo area: Uses dynamic sizing based on viewport (Logo width/height divided by 1.5)
 *   The division creates a proportionally smaller version of the original logo asset
 *
 * - Navigation area: Implements a complex responsive layout that switches between:
 *   - Mobile: Column-reverse layout with nav items at top
 *   - Desktop: Standard column layout with absolutely positioned nav items
 *
 * Navigation items include:
 * - GitHub repository link with NES-style icon styling (uses external NES.css)
 * - Custom background music player component
 *
 * The layout uses specific Tailwind classes to handle the responsive behavior:
 * - Mobile-first approach starting with flex-col-reverse
 * - Switches to flex-col at lg breakpoint
 * - Navigation transforms from centered to left-aligned at lg breakpoint
 */
export function Header() {
  return (
    <div className="relative flex flex-col-reverse lg:flex-col">
      <Link href="/" className="flex items-center justify-center lg:py-10">
        <Image
          src={Logo.src}
          width={Math.round(Logo.width / 1.5)}
          height={Math.round(Logo.height / 1.5)}
          alt="Connect4 Logo"
        />
      </Link>
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
