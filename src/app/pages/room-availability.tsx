import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  MapPin, 
  Monitor, 
  Sparkles, 
  Wind, 
  Check, 
  Search,
  Grid,
  List,
  Filter
} from 'lucide-react';
import { Link } from 'react-router';
import { mockRooms, mockUsers } from '../data/mock-data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function RoomAvailabilityPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    withPC: false,
    withBoard: false,
    quiet: false,
    outdoor: false,
    indoor: false,
    availableNow: false,
  });

  const currentUser = mockUsers[0];

  const filteredRooms = mockRooms.filter(room => {
    // Search filter
    if (searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Feature filters
    if (filters.withPC && !room.features.pc) return false;
    if (filters.withBoard && !room.features.whiteboard) return false;
    if (filters.quiet && room.type !== 'quiet') return false;
    if (filters.outdoor && room.type !== 'outdoor') return false;
    if (filters.indoor && room.type !== 'indoor') return false;
    if (filters.availableNow && room.status !== 'available') return false;

    return true;
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'whiteboard': return <Sparkles className="w-4 h-4" />;
      case 'pc': return <Monitor className="w-4 h-4" />;
      case 'monitor': return <Monitor className="w-4 h-4" />;
      case 'ac': return <Wind className="w-4 h-4" />;
      default: return <Check className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout 
      userRole="student" 
      userName={currentUser.name}
      userPoints={currentUser.points}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Browse Rooms</h1>
            <p className="text-[#6b7280]">Find your perfect study space</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-[#e5e7eb]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
              <Input 
                placeholder="Search by room name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#f9fafb] border-[#e5e7eb]"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.availableNow ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('availableNow')}
                className={filters.availableNow ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
              >
                <Check className="w-4 h-4 mr-1" />
                Available Now
              </Button>
              <Button
                variant={filters.withPC ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('withPC')}
                className={filters.withPC ? 'bg-[#4f46e5]' : ''}
              >
                <Monitor className="w-4 h-4 mr-1" />
                With PC
              </Button>
              <Button
                variant={filters.withBoard ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('withBoard')}
                className={filters.withBoard ? 'bg-[#8b5cf6]' : ''}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                With Board
              </Button>
              <Button
                variant={filters.quiet ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('quiet')}
                className={filters.quiet ? 'bg-[#4f46e5]' : ''}
              >
                Quiet
              </Button>
              <Button
                variant={filters.outdoor ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('outdoor')}
                className={filters.outdoor ? 'bg-[#10b981]' : ''}
              >
                Outdoor
              </Button>
              <Button
                variant={filters.indoor ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter('indoor')}
                className={filters.indoor ? 'bg-[#8b5cf6]' : ''}
              >
                Indoor
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6b7280]">
                Showing {filteredRooms.length} of {mockRooms.length} rooms
              </span>
              {Object.values(filters).some(v => v) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({
                    withPC: false,
                    withBoard: false,
                    quiet: false,
                    outdoor: false,
                    indoor: false,
                    availableNow: false,
                  })}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Room Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Rooms ({mockRooms.length})</TabsTrigger>
            <TabsTrigger value="available">
              Available ({mockRooms.filter(r => r.status === 'available').length})
            </TabsTrigger>
            <TabsTrigger value="quiet">Quiet Pods</TabsTrigger>
            <TabsTrigger value="group">Group Rooms</TabsTrigger>
            <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="border-[#e5e7eb] hover:shadow-xl transition-all overflow-hidden">
                    <div className="relative h-48">
                      <ImageWithFallback 
                        src={`https://images.unsplash.com/photo-${
                          room.image === 'study-room-quiet' ? '1497366216548-37526070297c' : 
                          room.image === 'meeting-room-modern' ? '1497366754035-f200968a6e72' :
                          room.image === 'outdoor-terrace-study' ? '1519389950473-47ba0277781c' :
                          room.image === 'study-pod-modern' ? '1497366812353-6870744d04b2' :
                          room.image === 'conference-room-large' ? '1497366412874-3415097a27e7' :
                          room.image === 'quiet-workspace' ? '1497015289639-54688650d173' :
                          room.image === 'rooftop-lounge' ? '1522202176988-66273c2fd55f' :
                          '1524758631624-e2822e304c36'
                        }?w=500&h=350&fit=crop`}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-4 right-4 ${
                          room.status === 'available' ? 'bg-[#10b981]' : 'bg-[#ef4444]'
                        }`}
                      >
                        {room.status}
                      </Badge>
                      {room.status === 'booked' && room.availableAt && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-lg text-xs text-[#6b7280]">
                          Available at {room.availableAt}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-[#1a1a2e] mb-2">{room.name}</h3>
                          <Badge variant="outline" className="text-xs capitalize">{room.type}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#1a1a2e]">{room.pricePerHour} EGP</div>
                          <div className="text-xs text-[#6b7280]">per hour</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="capitalize">{room.type}</Badge>
                        {Object.entries(room.features).map(([key, value]) => 
                          value && (
                            <Badge key={key} variant="secondary" className="flex items-center gap-1">
                              {getFeatureIcon(key)}
                              <span className="text-xs">
                                {key === 'pc' ? 'PC' : key === 'ac' ? 'AC' : key.charAt(0).toUpperCase() + key.slice(1)}
                              </span>
                            </Badge>
                          )
                        )}
                      </div>

                      <Link to="/booking">
                        <Button className="w-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">
                          Book Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                          <ImageWithFallback 
                            src={`https://images.unsplash.com/photo-${
                              room.image === 'study-room-quiet' ? '1497366216548-37526070297c' : 
                              room.image === 'meeting-room-modern' ? '1497366754035-f200968a6e72' :
                              room.image === 'outdoor-terrace-study' ? '1519389950473-47ba0277781c' :
                              room.image === 'study-pod-modern' ? '1497366812353-6870744d04b2' :
                              room.image === 'conference-room-large' ? '1497366412874-3415097a27e7' :
                              room.image === 'quiet-workspace' ? '1497015289639-54688650d173' :
                              room.image === 'rooftop-lounge' ? '1522202176988-66273c2fd55f' :
                              '1524758631624-e2822e304c36'
                            }?w=200&h=200&fit=crop`}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">{room.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-3">
                                <Badge variant="outline" className="capitalize">{room.type}</Badge>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(room.features).map(([key, value]) => 
                                  value && (
                                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                                      {getFeatureIcon(key)}
                                      <span className="text-xs">
                                        {key === 'pc' ? 'PC' : key === 'ac' ? 'AC' : key.charAt(0).toUpperCase() + key.slice(1)}
                                      </span>
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-[#1a1a2e] mb-1">{room.pricePerHour} EGP</div>
                              <div className="text-xs text-[#6b7280] mb-3">per hour</div>
                              <Badge 
                                className={room.status === 'available' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}
                              >
                                {room.status}
                              </Badge>
                            </div>
                          </div>
                          {room.status === 'booked' && room.availableAt && (
                            <p className="text-sm text-[#6b7280] mb-3">Available at {room.availableAt}</p>
                          )}
                          <Link to="/booking">
                            <Button className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">
                              Book This Room
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRooms.filter(r => r.status === 'available').map((room) => (
                <Card key={room.id} className="border-[#e5e7eb] hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
                    <Badge className="bg-[#10b981] mb-4">Available Now</Badge>
                    <Link to="/booking">
                      <Button className="w-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiet">
            <div className="text-center py-8 text-[#6b7280]">
              <p>Filter rooms by type using the main filter options above</p>
            </div>
          </TabsContent>

          <TabsContent value="group">
            <div className="text-center py-8 text-[#6b7280]">
              <p>Filter rooms by type using the main filter options above</p>
            </div>
          </TabsContent>

          <TabsContent value="outdoor">
            <div className="text-center py-8 text-[#6b7280]">
              <p>Filter rooms by type using the main filter options above</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
