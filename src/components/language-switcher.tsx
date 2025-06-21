"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    const newPath = routing.getLocalizedPathname({
      locale: newLocale,
      pathname,
      currentLocale,
    });
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => switchLocale("en")}>
        EN
      </Button>
      <Button variant="outline" onClick={() => switchLocale("fa")}>
        FA
      </Button>
    </div>
  );
}
