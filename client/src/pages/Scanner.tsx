import { useState } from "react";
import { Camera, Zap, Target, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import BarcodeScanner from "react-qr-barcode-scanner";

const scanHistory = [
  {
    id: 1,
    qrCode: "QR-2024-001",
    productType: "Plastic Bottle",
    timestamp: "2024-01-20 14:30",
    status: "verified",
    reward: "5 PTC",
  },
  {
    id: 2,
    qrCode: "QR-2024-002",
    productType: "Food Container",
    timestamp: "2024-01-20 12:15",
    status: "verified",
    reward: "3 PTC",
  },
  {
    id: 3,
    qrCode: "QR-2024-003",
    productType: "Shopping Bag",
    timestamp: "2024-01-19 16:45",
    status: "pending",
    reward: "2 PTC",
  },
];

const milestones = [
  {
    title: "First Scan",
    target: 1,
    current: 1,
    reward: "10 PTC",
    completed: true,
  },
  {
    title: "10 Scans",
    target: 10,
    current: 3,
    reward: "25 PTC",
    completed: false,
  },
  {
    title: "Weekly Goal",
    target: 50,
    current: 3,
    reward: "100 PTC",
    completed: false,
  },
  {
    title: "Monthly Target",
    target: 200,
    current: 3,
    reward: "500 PTC",
    completed: false,
  },
];

export default function ScannerPage() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<any>(null);

  const handleScan = () => {
    setIsCameraOpen(true);
    // Simulate scan after 2 seconds
    setTimeout(() => {
      const mockScanResult = {
        qrCode:
          "QR-2024-" +
          Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0"),
        productType: ["Plastic Bottle", "Food Container", "Shopping Bag"][
          Math.floor(Math.random() * 3)
        ],
        manufacturer: "EcoCorp Ltd",
        reward: Math.floor(Math.random() * 8) + 2,
        isValid: Math.random() > 0.1, // 90% chance of valid scan
      };

      setLastScanResult(mockScanResult);
      setIsCameraOpen(false);

      if (mockScanResult.isValid) {
        toast({
          title: "Scan Successful!",
          description: `Earned ${mockScanResult.reward} PTC tokens`,
        });
      } else {
        toast({
          title: "Invalid QR Code",
          description: "This QR code has already been scanned or is invalid",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto p-4">
      {/* Page Header */}
      <div className="text-center space-y-2 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold">QR Scanner</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Scan plastic waste QR codes to earn rewards
        </p>
      </div>

      {/* Scanner Section */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Camera className="w-6 h-6" />
            Start Scanning
          </CardTitle>
          <CardDescription>
            Point your camera at a QR code on plastic waste items
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="w-48 sm:w-64 h-48 sm:h-64 mx-auto bg-muted/20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarcodeScanner
                width={500}
                height={500}
                facingMode="environment"
                onUpdate={(err, result) => {
                  if (result) console.log(result);
                  else console.log("Not Found");
                }}
              />

              <div className="mt-2">
                <p className="text-xs text-muted-foreground">
                  Scan a QR code to get started
                </p>
                <p className="text-xs text-muted-foreground">
                  Ensure the QR code is clear and well-lit
                </p>
              </div>
            </div>
          </div>

          {/* <Button 
            size="lg" 
            onClick={handleScan}
            className="w-full sm:w-auto rounded-button h-12 sm:h-14 text-base sm:text-lg"
            disabled={isCameraOpen}
          >
            {isCameraOpen ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Scanning...
              </>
            ) : (
              <>
                <Camera className="w-6 h-6 mr-2" />
                Scan QR Code
              </>
            )}
          </Button> */}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Scans</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Earned</CardTitle>
            <Zap className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47 PTC</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">235</div>
            <p className="text-xs text-muted-foreground">CO₂ points saved</p>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Progress & Milestones</CardTitle>
          <CardDescription>
            Track your scanning achievements and unlock rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{milestone.title}</h4>
                    {milestone.completed && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reward:{" "}
                    <span className="font-medium text-secondary">
                      {milestone.reward}
                    </span>
                  </p>
                </div>
                <Badge variant={milestone.completed ? "default" : "secondary"}>
                  {milestone.current}/{milestone.target}
                </Badge>
              </div>
              <Progress
                value={(milestone.current / milestone.target) * 100}
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scan History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Your latest scanning activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <div>
                    <p className="font-medium">{scan.qrCode}</p>
                    <p className="text-sm text-muted-foreground">
                      {scan.productType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={
                        scan.status === "verified" ? "default" : "secondary"
                      }
                    >
                      {scan.status}
                    </Badge>
                    <span className="text-sm font-medium text-secondary">
                      +{scan.reward}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {scan.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Camera Modal */}
      <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scanning QR Code</DialogTitle>
            <DialogDescription>
              Point your camera at the QR code
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div className="w-48 h-48 bg-black rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Camera className="w-12 h-12 mx-auto mb-2" />
                <p>Camera Feed</p>
                <div className="animate-pulse mt-2">Scanning...</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
