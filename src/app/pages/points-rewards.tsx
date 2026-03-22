import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Award, Clock, Coffee, Droplet, Percent, TrendingUp, Gift, Star } from 'lucide-react';
import { mockUsers, mockRewards } from '../data/mock-data';

export function PointsRewardsPage() {
  const currentUser = mockUsers[0];
  const [selectedReward, setSelectedReward] = useState<typeof mockRewards[0] | null>(null);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);

  const handleRedeem = (reward: typeof mockRewards[0]) => {
    setSelectedReward(reward);
    setShowRedeemDialog(true);
  };

  const confirmRedeem = () => {
    if (selectedReward && currentUser.points >= selectedReward.pointsRequired) {
      alert(`✓ Successfully redeemed ${selectedReward.title}!\nRemaining points: ${currentUser.points - selectedReward.pointsRequired}`);
      setShowRedeemDialog(false);
      setSelectedReward(null);
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'free-hours': return <Clock className="w-8 h-8" />;
      case 'coffee': return <Coffee className="w-8 h-8" />;
      case 'drinks': return <Droplet className="w-8 h-8" />;
      case 'discount': return <Percent className="w-8 h-8" />;
      default: return <Gift className="w-8 h-8" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'free-hours': return 'from-[#4f46e5] to-[#6366f1]';
      case 'coffee': return 'from-[#8b5cf6] to-[#a78bfa]';
      case 'drinks': return 'from-[#06b6d4] to-[#0891b2]';
      case 'discount': return 'from-[#10b981] to-[#059669]';
      default: return 'from-[#f59e0b] to-[#d97706]';
    }
  };

  const nextMilestone = 500;
  const progress = (currentUser.points / nextMilestone) * 100;

  return (
    <DashboardLayout 
      userRole="student" 
      userName={currentUser.name}
      userPoints={currentUser.points}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Points & Rewards</h1>
          <p className="text-[#6b7280]">Earn points with every booking and redeem amazing rewards</p>
        </div>

        {/* Points Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-[#e5e7eb] bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white mb-2">Your Points Balance</CardTitle>
                  <CardDescription className="text-white/80">Keep earning to unlock more rewards</CardDescription>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-6xl font-bold mb-2">{currentUser.points}</div>
                <p className="text-white/80">Total Points</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Progress to {nextMilestone} points</span>
                  <span className="font-semibold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3 bg-white/20" />
                <p className="text-sm text-white/80">
                  {nextMilestone - currentUser.points} more points to unlock platinum tier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb]">
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4f46e5] to-[#6366f1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a2e] mb-1">Book Rooms</h4>
                  <p className="text-sm text-[#6b7280]">1 point per $ spent</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a2e] mb-1">Refer Friends</h4>
                  <p className="text-sm text-[#6b7280]">50 points per referral</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a2e] mb-1">Monthly Bonus</h4>
                  <p className="text-sm text-[#6b7280]">25 points for 10+ bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4f46e5] mb-1">32</div>
                <p className="text-sm text-[#6b7280]">Points Earned This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#8b5cf6] mb-1">150</div>
                <p className="text-sm text-[#6b7280]">Points Redeemed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#10b981] mb-1">5</div>
                <p className="text-sm text-[#6b7280]">Rewards Claimed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f59e0b] mb-1">Gold</div>
                <p className="text-sm text-[#6b7280]">Current Tier</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Rewards */}
        <Card className="border-[#e5e7eb]">
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Redeem your points for exclusive perks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {mockRewards.map((reward) => {
                const canAfford = currentUser.points >= reward.pointsRequired;
                return (
                  <div
                    key={reward.id}
                    className={`
                      relative p-6 rounded-xl border-2 transition-all
                      ${canAfford 
                        ? 'border-[#4f46e5] bg-gradient-to-br from-[#4f46e5]/5 to-[#8b5cf6]/5 hover:shadow-lg' 
                        : 'border-[#e5e7eb] bg-[#f9fafb] opacity-60'
                      }
                    `}
                  >
                    {!canAfford && (
                      <Badge className="absolute top-4 right-4 bg-[#6b7280]">Locked</Badge>
                    )}
                    <div className={`w-16 h-16 bg-gradient-to-br ${getIconColor(reward.type)} rounded-2xl flex items-center justify-center mb-4 text-white`}>
                      {getRewardIcon(reward.type)}
                    </div>
                    <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">{reward.title}</h3>
                    <p className="text-sm text-[#6b7280] mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#4f46e5]" />
                        <span className="text-2xl font-bold text-[#1a1a2e]">{reward.pointsRequired}</span>
                      </div>
                      <span className="text-sm text-[#6b7280]">points</span>
                    </div>
                    <Button 
                      className={`w-full ${
                        canAfford 
                          ? 'bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]' 
                          : 'bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
                      }`}
                      disabled={!canAfford}
                      onClick={() => handleRedeem(reward)}
                    >
                      {canAfford ? 'Redeem Now' : `Need ${reward.pointsRequired - currentUser.points} more points`}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Points History */}
        <Card className="border-[#e5e7eb]">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your points earning history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: 'Mar 21, 2026', action: 'Booking: Collaboration Space B', points: 30, type: 'earn' },
                { date: 'Mar 20, 2026', action: 'Redeemed: Free Coffee', points: -50, type: 'redeem' },
                { date: 'Mar 18, 2026', action: 'Booking: Focus Room A', points: 10, type: 'earn' },
                { date: 'Mar 15, 2026', action: 'Monthly Bonus', points: 25, type: 'bonus' },
                { date: 'Mar 14, 2026', action: 'Booking: Garden Terrace', points: 16, type: 'earn' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${item.type === 'earn' ? 'bg-[#10b981]' : 
                        item.type === 'bonus' ? 'bg-[#f59e0b]' : 
                        'bg-[#ef4444]'}
                    `}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1a2e]">{item.action}</h4>
                      <p className="text-sm text-[#6b7280]">{item.date}</p>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${
                    item.points > 0 ? 'text-[#10b981]' : 'text-[#ef4444]'
                  }`}>
                    {item.points > 0 ? '+' : ''}{item.points}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membership Tiers */}
        <Card className="border-[#e5e7eb] bg-gradient-to-br from-[#f9fafb] to-white">
          <CardHeader>
            <CardTitle>Membership Tiers</CardTitle>
            <CardDescription>Unlock more benefits as you earn points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl border-2 border-[#e5e7eb]">
                <Badge className="bg-[#6b7280] mb-4">Bronze</Badge>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">0 - 199 points</h3>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#6b7280] rounded-full" />
                    Standard rewards access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#6b7280] rounded-full" />
                    1x points on bookings
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#f59e0b]/10 to-white rounded-xl border-2 border-[#f59e0b]">
                <Badge className="bg-[#f59e0b] mb-4">Gold (Current)</Badge>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">200 - 499 points</h3>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full" />
                    All Bronze benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full" />
                    1.25x points on bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full" />
                    Priority booking
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-xl border-2 border-[#e5e7eb] opacity-60">
                <Badge className="bg-[#8b5cf6] mb-4">Platinum</Badge>
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">500+ points</h3>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full" />
                    All Gold benefits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full" />
                    1.5x points on bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full" />
                    Exclusive rewards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full" />
                    Free room upgrades
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redeem Confirmation Dialog */}
      <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem Reward</DialogTitle>
            <DialogDescription>Confirm your reward redemption</DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-gradient-to-br from-[#4f46e5]/10 to-[#8b5cf6]/10 rounded-xl text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${getIconColor(selectedReward.type)} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                  {getRewardIcon(selectedReward.type)}
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">{selectedReward.title}</h3>
                <p className="text-[#6b7280] mb-4">{selectedReward.description}</p>
                <div className="flex items-center justify-center gap-2 text-[#4f46e5]">
                  <Award className="w-5 h-5" />
                  <span className="text-3xl font-bold">{selectedReward.pointsRequired}</span>
                  <span>points</span>
                </div>
              </div>

              <div className="p-4 bg-[#f9fafb] rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-[#6b7280]">Current Points</span>
                  <span className="font-semibold text-[#1a1a2e]">{currentUser.points}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[#6b7280]">Cost</span>
                  <span className="font-semibold text-[#ef4444]">-{selectedReward.pointsRequired}</span>
                </div>
                <div className="pt-2 border-t border-[#e5e7eb] flex justify-between">
                  <span className="font-semibold text-[#1a1a2e]">Remaining Points</span>
                  <span className="font-bold text-[#4f46e5]">{currentUser.points - selectedReward.pointsRequired}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowRedeemDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]"
                  onClick={confirmRedeem}
                >
                  Confirm Redemption
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
