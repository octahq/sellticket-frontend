import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';

interface CustomTableProps {
  headers: string[]; // Table headers
  isLoading?: boolean; // Loading state
  skeletonRows?: number; // Number of skeleton rows to show during loading
  children?: React.ReactNode; // Table body content provided by the parent
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  isLoading = false,
  skeletonRows = 3,
  children,
}) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <div className="w-full  max-h-96 rounded-lg border-b-[#EFEFEF] border-b-2">
        <Table className="w-full capitalize font-semibold">
          {/* Table Header */}
          <TableHeader className="bg-white text-[#5B5B5B] text-sm ">
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {isLoading
              ? // Show Skeleton Rows if Loading
                Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {headers.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : // Render Children as Table Body
                children}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomTable;
