import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LocationCard = ({ setUser }: any) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const latitude = formData.get("latitude") as string;
    const longitude = formData.get("longitude") as string;

    const user = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    };

    setUser(user);
  };
  return (
    <Card className="w-full">
      <form onSubmit={handleSearch}>
        <CardHeader className="flex flex-row gap-2 items-center justify-between  p-0 pl-3 pr-3 py-2">
          <CardTitle className="text-base">Enter your location here</CardTitle>
          <Button size="sm" type="submit">
            Search
          </Button>
        </CardHeader>
        <CardContent className="p-0 pb-3 px-5">
          <div className="grid w-full items-center gap-2">
            <div className="flex flex-col items-center space-y-1">
              <Label htmlFor="latitude" className="text-sm">
                Latitude
              </Label>
              <Input
                type="text"
                id="latitude"
                name="latitude"
                placeholder="your latitude..."
              />
            </div>
            <div className="flex flex-col  items-center space-y-1">
              <Label htmlFor="longitude" className="text-sm">
                Longitude
              </Label>
              <Input
                type="text"
                id="longitude"
                name="longitude"
                placeholder="your longitude..."
              />
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};
