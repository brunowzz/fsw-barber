"use client";

import Image from "next/image";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";

import NavigationSideMenu from "./navigation-side-menu";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo FSW Barber"
              width={130}
              height={22}
            />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <NavigationSideMenu />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}
