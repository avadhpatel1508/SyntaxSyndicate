
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import IndiaMap from "@/components/india-map"
import { BarChart3, Leaf, Building2, Heart } from "lucide-react"

export default function HeatmapPage() {
  const [activeCategory, setActiveCategory] = useState("health")

  const categories = [
    {
      id: "health",
      label: "Health",
      icon: <Heart className="w-4 h-4" />,
      description: "Disease spread metrics",
      color: "from-red-500 to-red-700",
    },
    {
      id: "education",
      label: "Education",
      icon: <BarChart3 className="w-4 h-4" />,
      description: "Educational infrastructure",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "agriculture",
      label: "Agriculture",
      icon: <Leaf className="w-4 h-4" />,
      description: "Agricultural productivity",
      color: "from-green-500 to-green-700",
    },
    {
      id: "city-services",
      label: "City Services",
      icon: <Building2 className="w-4 h-4" />,
      description: "Urban infrastructure",
      color: "from-purple-500 to-purple-700",
    },
  ]

  const activeData = categories.find((c) => c.id === activeCategory)

  return (
    <main className="min-h-screen bg-secondary text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-primary">India Regional Analytics</h1>
            <p className="text-muted-foreground">Interactive map visualization of regional metrics across India</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`gap-2 ${
                  activeCategory === category.id
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground border-none"
                    : "border-border text-primary hover:border-primary/50"
                }`}
              >
                {category.icon}
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Category</div>
            <div className="text-2xl font-bold text-primary">{activeData?.label}</div>
            <div className="text-xs text-muted-foreground mt-2">{activeData?.description}</div>
          </Card>

          <Card className="bg-card border-border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Map Type</div>
            <div className="text-2xl font-bold text-primary">Interactive</div>
            <div className="text-xs text-muted-foreground mt-2">Leaflet based</div>
          </Card>

          <Card className="bg-card border-border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Data Points</div>
            <div className="text-2xl font-bold text-primary">10</div>
            <div className="text-xs text-muted-foreground mt-2">Regional markers</div>
          </Card>

          <Card className="bg-card border-border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Theme</div>
            <div className="text-2xl font-bold text-primary">Light</div>
            <div className="text-xs text-muted-foreground mt-2">Government theme</div>
          </Card>
        </div>

        {/* Map */}
        <Card className="bg-card border-border p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
              {activeData?.icon}
              {activeData?.label} Distribution Map
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Click on markers to view detailed information about each region. Marker size represents intensity level.
            </p>
          </div>

          <IndiaMap category={activeCategory} />
        </Card>
      </div>
    </main>
  )
}
