"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export const CustomTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button size="icon" onClick={toggleSidebar}>
      <Menu />
    </Button>
  );
};
