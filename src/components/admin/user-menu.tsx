"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { TfiMoreAlt } from "react-icons/tfi";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";

export const UserMenu = () => {
  const [avatar, setAvatar] = useState(true);
  return (
    <div className="absolute left-0 bottom-2 w-full px-3 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start bg-muted hover:bg-muted/60 active:bg-primary"
          >
            <div className="flex justify-between items-center w-full ">
              <div className="flex gap-2">
                {avatar ? (
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="https://media.licdn.com/dms/image/D4D03AQEym-yHx7WN_g/profile-displayphoto-shrink_200_200/0/1687146210823?e=2147483647&v=beta&t=SDyFqwAKh_eYpaIKkUTFWOaBPttrepHTCu-qqTXMG-k" />
                  </Avatar>
                ) : (
                  <RxAvatar size={20} />
                )}

                <span>Nicholas Ali</span>
              </div>
              <TfiMoreAlt size={20} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
          <div className="space-y-1">
            <Button size="sm" className="w-full gap-1">
              <HiOutlineLogout size={20} />
              Log Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
