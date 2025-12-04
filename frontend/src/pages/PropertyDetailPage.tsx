import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { propertyApi } from "../services/api";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { ArrowLeft, MapPin, Ruler, Calendar } from "lucide-react";

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyApi.getOne(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center p-10">Chargement...</div>;
  if (error || !property)
    return (
      <div className="text-center p-10 text-red-500">Annonce introuvable</div>
    );

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Button
        onClick={() => navigate("/")}
        className="mb-4 gap-2 pl-0 hover:bg-transparent hover:text-blue-600"
      >
        <ArrowLeft size={16} /> Retour aux annonces
      </Button>

      <Card className="overflow-hidden shadow-lg border-slate-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
                {property.title}
              </CardTitle>
              <div className="flex items-center text-slate-500 gap-2">
                <MapPin size={18} />
                <span className="text-lg">{property.city}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {property.price.toLocaleString()} €
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3">
              <Ruler className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-slate-500">Surface</p>
                <p className="font-semibold text-lg">{property.surface} m²</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3">
              <Calendar className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-slate-500">Date de mise en ligne</p>
                <p className="font-semibold text-lg">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description ||
                "Aucune description fournie pour ce bien."}
            </p>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50 p-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/edit/${property.id}`)}
          >
            Modifier cette annonce
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
