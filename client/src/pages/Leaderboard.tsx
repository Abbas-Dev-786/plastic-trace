import { useState } from "react";
import { Trophy, Medal, Award, TrendingUp, Users, Calendar, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const leaderboardData = [
  {
    rank: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/placeholder-avatar-1.jpg",
      role: "Rag Picker",
      location: "San Francisco, CA",
    },
    stats: {
      itemsScanned: 2847,
      tokensEarned: 14235,
      co2Saved: 425,
      weeklyGrowth: 23.5,
    },
    badges: ["Ocean Guardian", "Carbon Hero", "Weekly Champion"],
  },
  {
    rank: 2,
    user: {
      name: "Marcus Rodriguez",
      avatar: "/placeholder-avatar-2.jpg", 
      role: "Recycler",
      location: "Austin, TX",
    },
    stats: {
      itemsScanned: 2654,
      tokensEarned: 13270,
      co2Saved: 398,
      weeklyGrowth: 18.2,
    },
    badges: ["Eco Warrior", "Efficiency Master"],
  },
  {
    rank: 3,
    user: {
      name: "Aisha Patel",
      avatar: "/placeholder-avatar-3.jpg",
      role: "Citizen",
      location: "Mumbai, India",
    },
    stats: {
      itemsScanned: 2341,
      tokensEarned: 11705,
      co2Saved: 351,
      weeklyGrowth: 31.7,
    },
    badges: ["Rising Star", "Community Leader"],
  },
  {
    rank: 4,
    user: {
      name: "James Wilson",
      avatar: "/placeholder-avatar-4.jpg",
      role: "Rag Picker", 
      location: "London, UK",
    },
    stats: {
      itemsScanned: 2198,
      tokensEarned: 10990,
      co2Saved: 329,
      weeklyGrowth: 12.8,
    },
    badges: ["Consistent Performer"],
  },
  {
    rank: 5,
    user: {
      name: "Elena Kowalski",
      avatar: "/placeholder-avatar-5.jpg",
      role: "Recycler",
      location: "Berlin, Germany",
    },
    stats: {
      itemsScanned: 1987,
      tokensEarned: 9935,
      co2Saved: 298,
      weeklyGrowth: 8.4,
    },
    badges: ["Green Pioneer"],
  },
];

const impactStats = [
  {
    label: "Total Items Tracked",
    value: "2.4M+",
    change: "+15.3%",
    icon: Trophy,
  },
  {
    label: "CO₂ Prevented",
    value: "1,250 tons",
    change: "+22.7%",
    icon: Award,
  },
  {
    label: "Active Contributors", 
    value: "25,847",
    change: "+8.9%",
    icon: Users,
  },
  {
    label: "Tokens Distributed",
    value: "15.7M PTC",
    change: "+31.2%",
    icon: TrendingUp,
  },
];

const topRegions = [
  { name: "California", items: 345678, growth: 24.5 },
  { name: "Texas", items: 298432, growth: 18.3 },
  { name: "New York", items: 276543, growth: 21.7 },
  { name: "Florida", items: 234567, growth: 16.8 },
  { name: "Illinois", items: 198765, growth: 13.2 },
];

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("individuals");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      "Ocean Guardian": "bg-blue-100 text-blue-800",
      "Carbon Hero": "bg-green-100 text-green-800", 
      "Weekly Champion": "bg-yellow-100 text-yellow-800",
      "Eco Warrior": "bg-emerald-100 text-emerald-800",
      "Efficiency Master": "bg-purple-100 text-purple-800",
      "Rising Star": "bg-pink-100 text-pink-800",
      "Community Leader": "bg-indigo-100 text-indigo-800",
      "Consistent Performer": "bg-gray-100 text-gray-800",
      "Green Pioneer": "bg-teal-100 text-teal-800",
    };
    return colors[badge as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Global Leaderboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Celebrating our top environmental contributors</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {impactStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-success">{stat.change}</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individuals">Top Contributors</TabsTrigger>
          <TabsTrigger value="regions">Top Regions</TabsTrigger>
        </TabsList>

        <TabsContent value="individuals" className="space-y-6">
          {/* Search Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contributors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>
                {selectedPeriod === "weekly" ? "This week's" : selectedPeriod === "monthly" ? "This month's" : "All-time"} top performers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((entry) => (
                  <div key={entry.rank} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={entry.user.avatar} />
                        <AvatarFallback>{entry.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{entry.user.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">{entry.user.role}</Badge>
                          <span>{entry.user.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden lg:flex flex-col items-end text-sm">
                      <span className="font-semibold">{entry.stats.itemsScanned.toLocaleString()} items</span>
                      <span className="text-muted-foreground">{entry.stats.tokensEarned.toLocaleString()} PTC</span>
                    </div>

                    <div className="hidden md:flex flex-col items-end text-sm">
                      <span className="font-semibold">{entry.stats.co2Saved} kg CO₂</span>
                      <span className="text-success">+{entry.stats.weeklyGrowth}%</span>
                    </div>

                    {/* Badges */}
                    <div className="hidden xl:flex flex-wrap gap-1 max-w-48">
                      {entry.badges.slice(0, 2).map((badge, index) => (
                        <Badge key={index} className={`text-xs ${getBadgeColor(badge)}`}>
                          {badge}
                        </Badge>
                      ))}
                      {entry.badges.length > 2 && (
                        <Badge variant="secondary" className="text-xs">+{entry.badges.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Regions</CardTitle>
              <CardDescription>Regions leading in plastic waste tracking and recycling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRegions.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{region.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {region.items.toLocaleString()} items tracked
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-success">+{region.growth}%</div>
                      <div className="text-xs text-muted-foreground">growth</div>
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