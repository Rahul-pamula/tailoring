import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import DesignCard, { Design } from "@/components/designs/DesignCard";
import DesignModal from "@/components/designs/DesignModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getDesigns, ApiDesign } from "@/services/api";

const filters = [
  { label: "All Designs", value: "all" },
  { label: "Dress Designs", value: "Dress" },
  { label: "Blouse Designs", value: "Blouse" },
  { label: "Maggam Work", value: "Maggam" },
];

const Designs = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const data = await getDesigns();
        // Transform API data to Component data
        const transformedDesigns: Design[] = data.map((d: ApiDesign) => ({
          id: d.id.toString(),
          designNumber: `DES-${d.id}`,
          name: d.name,
          category: d.category, // Assuming API returns 'Dress', 'Blouse', etc.
          imageUrl: d.images.length > 0 ? d.images[0].image : "",
          description: d.description,
          price: d.price
        }));
        setDesigns(transformedDesigns);
      } catch (error) {
        console.error("Failed to fetch designs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  const filteredDesigns = useMemo(() => {
    return designs.filter((design) => {
      const matchesCategory = selectedCategory === "all" || design.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.designNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, designs]);

  const handleDesignClick = (design: Design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/50 to-background">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 animate-fade-in">
            Design Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            Explore our collection of exquisite designs. Find inspiration for your next custom creation.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedCategory === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(filter.value)}
                  className="text-sm"
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          {loading ? (
            <div className="text-center py-16">Loading designs...</div>
          ) : filteredDesigns.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onClick={() => handleDesignClick(design)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No designs found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Design Modal */}
      <DesignModal
        design={selectedDesign}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default Designs;
