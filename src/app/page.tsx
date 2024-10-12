import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";

export default function Home() {
  return (
    <div className="">
      <Input />
      <Button>Primary</Button>;<Button variant={"secondary"}>Secondary</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"muted"}>Link</Button>
      <Button variant={"outline"}>Outline</Button>
      <Button variant={"tertiary"}>Tertiary</Button>
    </div>
  );
}
