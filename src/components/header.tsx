import Image from "next/image";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <Image
            src="/logo.svg"
            alt="Logo FSW Barber"
            width={130}
            height={22}
          />

          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </header>
  );
}
