import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export default function BookingItem() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-0">
        <div className="flex flex-col gap-2 p-5">
          <Badge className="w-fit bg-[#221C3D] text-primary hover:bg-[#221C3D]">
            Confirmado
          </Badge>
          <h3 className="font-bold">Corte de cabelo</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <p className="text-sm">Vintage Barber Shop</p>
          </div>
        </div>

        <div className="border--secondary flex flex-col items-center justify-center gap-1 border-l border-solid p-5">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">6</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
}
