import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useMemo } from "react";

interface Props {
  csvData: { [col: string]: string }[];
  mockData: { [col: string]: string | number | object[] }[];
}

export default function ResultCard({ csvData, mockData }: Props) {
  const csvCols = useMemo(
    () => Object.entries(csvData[0] ?? {}).map(([key]) => key),
    [csvData]
  );
  const mockCols = useMemo(
    () => Object.entries(mockData[0] ?? {}).map(([key]) => key),
    [mockData]
  );

  console.log({ csvData, csvCols, mockData, mockCols });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>Table of uploaded csv & mock data</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <Table>
          <TableHeader>
            <TableRow>
              {csvCols.map((col, index) => (
                <TableHead key={index}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {csvData.map((item, index) => (
              <TableRow key={index}>
                {Object.entries(item).map(([, value], index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-2 w-full h-96">
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                width={width}
                height={height}
                columnCount={mockCols.length}
                columnWidth={100}
                rowCount={mockData.length}
                rowHeight={100}
                itemData={mockData.map((item) => Object.values(item))}
              >
                {({
                  data,
                  columnIndex,
                  rowIndex,
                  style,
                }: GridChildComponentProps) => {
                  const item = data[rowIndex][columnIndex];

                  return (
                    <div style={style}>
                      {Array.isArray(item) ? item.join(", ") : item}
                    </div>
                  );
                }}
              </Grid>
            )}
          </AutoSizer>
        </div>
      </CardContent>
    </Card>
  );
}
