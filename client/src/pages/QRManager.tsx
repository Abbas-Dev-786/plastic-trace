import { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GenerateQrDialog from "@/components/qr/generate-qr-dialog";

const qrData = [
  {
    id: "QR001",
    code: "QR-2024-001",
    productType: "Plastic Bottle",
    manufacturer: "EcoCorp Ltd",
    status: "assigned",
    assignedTo: "Alice Cooper",
    createdAt: "2024-01-15",
    scannedAt: null,
  },
  {
    id: "QR002",
    code: "QR-2024-002",
    productType: "Food Container",
    manufacturer: "GreenPack Inc",
    status: "scanned",
    assignedTo: "Bob Wilson",
    createdAt: "2024-01-14",
    scannedAt: "2024-01-20",
  },
  {
    id: "QR003",
    code: "QR-2024-003",
    productType: "Shopping Bag",
    manufacturer: "EcoCorp Ltd",
    status: "available",
    assignedTo: null,
    createdAt: "2024-01-13",
    scannedAt: null,
  },
  {
    id: "QR004",
    code: "QR-2024-004",
    productType: "Water Bottle",
    manufacturer: "AquaClean Co",
    status: "recycled",
    assignedTo: "Carol Davis",
    createdAt: "2024-01-12",
    scannedAt: "2024-01-18",
  },
];

const statusColors = {
  available: "bg-muted text-muted-foreground",
  assigned: "bg-secondary text-secondary-foreground",
  scanned: "bg-primary text-primary-foreground",
  recycled: "bg-success text-success-foreground",
};

export default function QRManager() {
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCodes(qrData.map((item) => item.id));
    } else {
      setSelectedCodes([]);
    }
  };

  const handleSelectCode = (codeId: string, checked: boolean) => {
    if (checked) {
      setSelectedCodes([...selectedCodes, codeId]);
    } else {
      setSelectedCodes(selectedCodes.filter((id) => id !== codeId));
    }
  };

  const filteredData = qrData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 p-2 sm:p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">QR Code Manager</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Generate, assign, and track QR codes for plastic products
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button> */}
          <GenerateQrDialog
            isGenerateOpen={isGenerateOpen}
            setIsGenerateOpen={setIsGenerateOpen}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total QR Codes
            </CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,483</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Badge variant="secondary" className="text-xs">
              Ready
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,742</div>
            <p className="text-xs text-muted-foreground">Unassigned codes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scanned</CardTitle>
            <Badge className="text-xs">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,741</div>
            <p className="text-xs text-muted-foreground">In circulation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycled</CardTitle>
            <Badge variant="default" className="text-xs bg-success">
              Complete
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,234</div>
            <p className="text-xs text-muted-foreground">
              Successfully processed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile-Responsive Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">
                QR Code Inventory
              </CardTitle>
              <CardDescription>
                Manage and track all generated QR codes
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCodes.length === qrData.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Product Type</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCodes.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleSelectCode(item.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.productType}</TableCell>
                    <TableCell>{item.manufacturer}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[item.status as keyof typeof statusColors]
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.assignedTo || "-"}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download QR</DropdownMenuItem>
                          <DropdownMenuItem>Assign User</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3 p-4">
            {filteredData.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedCodes.includes(item.id)}
                      onCheckedChange={(checked) =>
                        handleSelectCode(item.id, checked as boolean)
                      }
                    />
                    <div>
                      <div className="font-medium text-sm">{item.code}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.productType}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download QR</DropdownMenuItem>
                      <DropdownMenuItem>Assign User</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <span>{item.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      className={
                        statusColors[item.status as keyof typeof statusColors]
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned:</span>
                    <span>{item.assignedTo || "Unassigned"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{item.createdAt}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
