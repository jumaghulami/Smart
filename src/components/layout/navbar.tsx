"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Globe, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "../theme-toggle";
import Container from "../container";

export default function Navbar() {
  const t = useTranslations("Navbar-tra");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const availableLocales = [
    { code: "en", label: "English" },
    { code: "fa", label: "فارسی" },
  ];

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full transition-colors border-b shadow-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between py-4 mx-auto">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {t("logo")}
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-4 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="text-gray-900 dark:text-white"
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-900 border-gray-300 dark:text-white dark:border-gray-700"
                >
                  <Globe className="w-4 h-4" />
                  {locale.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border dark:bg-gray-800 dark:border-gray-700"
              >
                {availableLocales.map((item) => (
                  <DropdownMenuItem
                    key={item.code}
                    onClick={() => changeLocale(item.code)}
                    className={`${
                      locale === item.code ? "font-bold" : ""
                    } text-gray-900 dark:text-white`}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-64 p-6 text-gray-900 bg-white dark:bg-gray-900 dark:text-white"
              >
                <div className="flex items-center justify-between mb-6">
                  <Link href={`/${locale}`} className="text-xl font-bold">
                    {t("logo")}
                  </Link>
                  <SheetTrigger asChild>
                    {/* <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="w-6 h-6" />
                  </Button> */}
                  </SheetTrigger>
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-gray-900 dark:text-white"
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  <ThemeToggle />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 text-gray-900 border-gray-300 dark:text-white dark:border-gray-700"
                      >
                        <Globe className="w-4 h-4" />
                        {locale.toUpperCase()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white border dark:bg-gray-800 dark:border-gray-700"
                    >
                      {availableLocales.map((item) => (
                        <DropdownMenuItem
                          key={item.code}
                          onClick={() => changeLocale(item.code)}
                          className={`${
                            locale === item.code ? "font-bold" : ""
                          } text-gray-900 dark:text-white`}
                        >
                          {item.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </nav>
  );
}
