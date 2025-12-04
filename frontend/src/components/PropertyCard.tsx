import { type Property } from "../types";
import { useNavigate } from "react-router-dom";
import { MapPin, Ruler, Euro } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  property: Property;
}

export const PropertyCard = ({ property }: Props) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 flex flex-col h-full border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 line-clamp-1">
          {property.title}
        </CardTitle>
        <div className="flex items-center text-sm text-slate-500 gap-1">
          <MapPin size={14} />
          {property.city}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow">
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-slate-700">
            <Ruler size={18} className="text-blue-500" />
            <span className="font-medium">{property.surface} m²</span>
          </div>
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Euro size={18} className="text-green-600" />
            <span>{property.price.toLocaleString()}</span>
          </div>
        </div>

        {property.description && (
          <p className="text-sm text-slate-500 line-clamp-2">
            {property.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="gap-3 pt-2">
    
        <Button
          variant="outline"
          className="flex-1 w-full"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${property.id}`);
          }}
        >
          Modifier
        </Button>

    
        <Button
          className="flex-1 w-full"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/property/${property.id}`);
          }}
        >
          Voir
        </Button>
      </CardFooter>
    </Card>
  );
};
