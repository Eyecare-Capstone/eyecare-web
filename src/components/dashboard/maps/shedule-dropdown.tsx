/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ScheduleDropdown({ schedule }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">See schedule 📆</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>
          The schedule for the clinic this week.
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <h3>Monday</h3>
            <span className="ml-2">
              {schedule.monday !== "" ? (
                schedule.monday
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h3>Tuesday</h3>
            <span className="ml-2">
              {schedule.tuesday !== "" ? (
                schedule.tuesday
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h3>Wednesday</h3>
            <span className="ml-2">
              {schedule.wednesday !== "" ? (
                schedule.wednesday
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h1>Thursday</h1>
            <span className="ml-2">
              {schedule.thursday !== "" ? (
                schedule.thursday
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h1>Friday</h1>
            <span className="ml-2">
              {schedule.friday !== "" ? (
                schedule.friday
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h1>Saturday</h1>
            <span className="ml-2">
              {schedule.saturday !== "" ? (
                schedule.saturday
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h1>Sunday</h1>
            <span className="ml-2">
              {schedule.sunday !== "" ? (
                schedule.sunday
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
