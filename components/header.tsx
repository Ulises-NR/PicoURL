import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import ThemeSwitcher from "./theme-switcher";
import { CustomTrigger } from "./custom-sidebar";

export const Header = () => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 border-b dark:border-slate-600">
        <div className="hidden md:block">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-x-2 text-2xl font-bold text-primary"
              >
                <Image src="/Logo.png" alt="Logo" width="24" height="24" />
                <h2 className="text-neutral-800 dark:text-white">PicoURL</h2>
              </Link>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-4">
                <CustomTrigger />
              </div>

              <Separator
                className="h-[20px] dark:bg-slate-600"
                orientation="vertical"
              />

              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
