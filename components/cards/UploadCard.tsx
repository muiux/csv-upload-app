import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface Props {
  onUpload: (file: File) => void;
}

export default function UploadCard({ onUpload }: Props) {
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>Upload CSV</CardTitle>
          <CardDescription>CSV should have a following format</CardDescription>
        </div>
        <div>
          <Label
            htmlFor="picture"
            className="cursor-pointer border rounded-sm p-4 border-black"
          >
            Upload CSV
          </Label>
          <Input
            id="picture"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleUpload}
          />
        </div>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-1/2 min-w-96 flex flex-col gap-2">
          <span className="font-bold">Sample CSV format:</span>
          <Separator />
          <p>
            id,name,age,email
            <br />
            1,John Doe,28,john@example.com
            <br />
            2,Jane Smith,34,jane@example.com
            <br />
            3,Bob Johnson,45,bob@example.com
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
