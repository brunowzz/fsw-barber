import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Calendar,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function NavigationSideMenu() {
  const { data } = useSession();

  function handleLogin() {
    try {
      signIn("google");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SheetContent className="p-0">
      <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user && (
        <>
          <div className="flex items-center justify-between px-5 py-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={data.user?.image ?? ""}
                  alt={data.user.name!}
                />
              </Avatar>

              <h2 className="font-bold">{data.user.name}</h2>
            </div>

            <Button variant="outline" size="icon" onClick={() => signOut()}>
              <LogOutIcon />
            </Button>
          </div>

          <div className="flex flex-col gap-3 px-5">
            <Button variant="outline" className="justify-start gap-1" asChild>
              <Link href="/">
                <HomeIcon size={14} /> Início
              </Link>
            </Button>

            <Button variant="outline" className="justify-start gap-1" asChild>
              <Link href="/bookings">
                <Calendar size={14} /> Agendamentos
              </Link>
            </Button>
          </div>
        </>
      )}

      {!data?.user && (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex items-center gap-2">
            <UserIcon />
            <h2 className="font-bold">Olá, faça seu login.</h2>
          </div>

          <Button
            onClick={handleLogin}
            variant="outline"
            className="w-full justify-start gap-1"
          >
            <LogInIcon size={14} />
            Fazer Login
          </Button>

          <Button variant="outline" className="justify-start gap-1" asChild>
            <Link href="/">
              <HomeIcon size={14} /> Início
            </Link>
          </Button>
        </div>
      )}
    </SheetContent>
  );
}
