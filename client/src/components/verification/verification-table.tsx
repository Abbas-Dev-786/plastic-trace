import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { CheckCircle, Clock, Package, XCircle } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { getAllQrCodes } from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { CustomPagination } from "../ui/pagination";

const statusColors = {
  Available: "bg-muted text-muted-foreground",
  Assigned: "bg-secondary text-secondary-foreground",
  Scanned: "bg-primary text-primary-foreground",
  Verified: "bg-success text-success-foreground",
  Recycled: "bg-destructive text-destructive-foreground",
};

const VerificationTable = () => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Scanned");

  const { data, isLoading } = useQuery({
    queryKey: [
      "qrCodes",
      {
        page,
        limit: 10,
        status: activeTab,
      },
    ],
    queryFn: getAllQrCodes,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Scanned">Pending </TabsTrigger>
        <TabsTrigger value="Verified">Verified </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>QR Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scanned By</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.docs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No items found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.docs?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      QR-2025-{item.qrId}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[item.status as keyof typeof statusColors]
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.ragPicker}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => {}}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && (
          <CustomPagination
            currentPage={page}
            totalPages={data?.pagination?.totalPages}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default VerificationTable;
