import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function WalletConnectButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    try {
      if (typeof (window as any).ethereum !== "undefined") {
        // Mock wallet connection for demo
        const mockAddress = "0x742d35Cc6464C9B5E623B1234567890123456789";
        setAddress(mockAddress);
        setIsConnected(true);
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to MetaMask",
        });
      } else {
        toast({
          title: "Wallet Not Found",
          description: "Please install MetaMask to continue",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected wallet",
    });
  };

  if (isConnected) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={disconnectWallet}
        className="gap-2"
      >
        <Wallet className="w-4 h-4" />
        <span className="hidden sm:inline">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      </Button>
    );
  }

  return (
    <Button onClick={connectWallet} size="sm" className="gap-2 rounded-button">
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
    </Button>
  );
}