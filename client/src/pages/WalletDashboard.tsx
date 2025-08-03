import { useState } from "react";
import {
  Wallet,
  Send,
  Download,
  TrendingUp,
  Award,
  Gift,
  Eye,
  History,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { ecoRewardTokenContract } from "@/config/thirdweb.config";
import { toTokens } from "thirdweb";
import { Skeleton } from "@/components/ui/skeleton";

const tokenBalance = {
  ptc: 1247,
  usd: 3741.25,
  change24h: 12.5,
  trend: "up",
};

const nftCollection = [
  {
    id: 1,
    name: "Eco Warrior Bronze",
    description: "First 100 scans milestone",
    image: "bronze-badge.png",
    rarity: "Common",
    earned: "2024-01-15",
  },
  {
    id: 2,
    name: "Ocean Guardian",
    description: "Prevented 50kg of ocean plastic",
    image: "ocean-badge.png",
    rarity: "Rare",
    earned: "2024-01-18",
  },
  {
    id: 3,
    name: "Carbon Reducer",
    description: "Saved 100 tons of CO₂",
    image: "carbon-badge.png",
    rarity: "Epic",
    earned: "2024-01-20",
  },
];

const transactions = [
  {
    id: 1,
    type: "earn",
    amount: "+15 PTC",
    description: "QR Scan Reward",
    timestamp: "2024-01-20 14:30",
    status: "completed",
  },
  {
    id: 2,
    type: "earn",
    amount: "+25 PTC",
    description: "Weekly Milestone Bonus",
    timestamp: "2024-01-20 10:00",
    status: "completed",
  },
  {
    id: 3,
    type: "withdraw",
    amount: "-50 PTC",
    description: "Withdrawal to External Wallet",
    timestamp: "2024-01-19 16:45",
    status: "pending",
  },
  {
    id: 4,
    type: "earn",
    amount: "+8 PTC",
    description: "Verification Reward",
    timestamp: "2024-01-19 14:20",
    status: "completed",
  },
];

const milestones = [
  {
    title: "Weekly Collector",
    progress: 75,
    target: "50 scans",
    reward: "100 PTC",
  },
  {
    title: "Monthly Champion",
    progress: 25,
    target: "200 scans",
    reward: "500 PTC",
  },
  {
    title: "Eco Master",
    progress: 10,
    target: "1000 scans",
    reward: "2000 PTC + NFT",
  },
];

export default function WalletDashboard() {
  const [selectedTab, setSelectedTab] = useState("rewards");

  const activeAccount = useActiveAccount();
  const { data, isPending } = useReadContract({
    contract: ecoRewardTokenContract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [activeAccount?.address],
    queryOptions: {
      enabled: Boolean(activeAccount?.address),
    },
  });

  console.log(data);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Wallet Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your tokens, NFTs, and rewards
          </p>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="rounded-button w-full sm:w-auto">
            <Send className="w-4 h-4 mr-2" />
            Transfer
          </Button>
        </div> */}
      </div>

      {/* Token Balance Card */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-white">
                PlasticTrace Tokens (PTC)
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Your environmental impact rewards
              </CardDescription>
            </div>
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-4xl font-bold text-white">
                {isPending ? <Skeleton></Skeleton> : toTokens(data, 18)} PTC
              </div>
              {/* <div className="text-xl text-primary-foreground/80">
                ≈ ${tokenBalance.usd.toLocaleString()}
              </div> */}
            </div>
            {/* <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white">+{tokenBalance.change24h}%</span>
              <span className="text-primary-foreground/80">24h change</span>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+127 PTC</div>
                <p className="text-xs text-muted-foreground">From 23 scans</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earned
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847 PTC</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rank</CardTitle>
                <Badge className="text-xs">#47</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Top 5%</div>
                <p className="text-xs text-muted-foreground">
                  Global leaderboard
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Milestone Progress</CardTitle>
              <CardDescription>
                Track your progress towards earning bonus rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Target: {milestone.target} • Reward:{" "}
                        <span className="text-secondary font-medium">
                          {milestone.reward}
                        </span>
                      </p>
                    </div>
                    <Badge variant="secondary">{milestone.progress}%</Badge>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent> */}

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>
                Redeem your tokens for various rewards and benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Cash Withdrawal</CardTitle>
                    <CardDescription>
                      Convert tokens to fiat currency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">1 PTC = $3.00</div>
                      <Button className="w-full rounded-button">
                        Withdraw Tokens
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Eco Products</CardTitle>
                    <CardDescription>
                      Purchase sustainable products with tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Starting from 50 PTC
                      </div>
                      <Button
                        variant="outline"
                        className="w-full rounded-button"
                      >
                        Browse Store
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nfts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievement NFTs</CardTitle>
              <CardDescription>
                Collectible badges representing your environmental achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {nftCollection.map((nft) => (
                  <Card
                    key={nft.id}
                    className="hover:shadow-elegant transition-shadow"
                  >
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 bg-gradient-eco rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-lg">{nft.name}</CardTitle>
                      <Badge variant="secondary">{nft.rarity}</Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        {nft.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Earned: {nft.earned}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                All your token transactions and rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "earn" ? "bg-success/20" : "bg-primary/20"
                        }`}
                      >
                        {tx.type === "earn" ? (
                          <TrendingUp className="w-5 h-5 text-success" />
                        ) : (
                          <Send className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          tx.type === "earn"
                            ? "text-success"
                            : "text-foreground"
                        }`}
                      >
                        {tx.amount}
                      </p>
                      <Badge
                        variant={
                          tx.status === "completed" ? "default" : "secondary"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
