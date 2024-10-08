"use client";

import Papa from "papaparse";
import ResultCard from "@/components/cards/ResultCard";
import UploadCard from "@/components/cards/UploadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function Home() {
  const [csvData, setCsvData] = useState<{ [col: string]: string }[]>([]);
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mock");
        const { data } = await response.json();
        setMockData(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  const onUpload = (file: File) => {
    Papa.parse(file, {
      header: true, // Use first row as the header row
      skipEmptyLines: true, // Ignore empty lines
      complete: (results) => {
        console.log("--------", results);
        const { data } = results;
        setCsvData(data as { [col: string]: string }[]);
      },
      error: (error) => {
        console.error("Error parsing the CSV file:", error);
      },
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="container flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <UploadCard onUpload={onUpload} />
          </TabsContent>
          <TabsContent value="result">
            <ResultCard csvData={csvData} mockData={mockData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
