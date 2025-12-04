import { useQuery } from "@tanstack/react-query";
import { propertyApi } from "../services/api";
import { PropertyCard } from "../components/PropertyCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const HomePage = () => {
  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: propertyApi.getAll,
  });

  if (isLoading) return <div className="p-8 text-center">Chargement...</div>;
  if (error)
    return (
      <div className="p-8 text-red-500 text-center">Erreur de chargement</div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Nos Annonces</h1>
        <Link
          to="/create"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus size={20} /> Nouvelle annonce
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  );
};
