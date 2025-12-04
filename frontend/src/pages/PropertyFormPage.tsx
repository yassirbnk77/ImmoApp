import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyFormSchema, type PropertyFormValues } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { propertyApi } from "../services/api";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

export const PropertyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;
  const [serverError, setServerError] = useState<string | null>(null);

  // récupération des données
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyApi.getOne(id!),
    enabled: isEditMode,
  });

  // configuration du Formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
  });

  // remplissage
  useEffect(() => {
    if (property) {
      console.log("Données chargées pour édition:", property);
      reset(property);
    }
  }, [property, reset]);

  // mutation (Envoi au serveur)
  const mutation = useMutation({
    mutationFn: (data: PropertyFormValues) => {
      console.log("Envoi des données au backend:", data);
      return isEditMode
        ? propertyApi.update(id!, data)
        : propertyApi.create(data);
    },
    onSuccess: () => {
      console.log("Succès ! Redirection...");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Erreur serveur:", error);
      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors de l'enregistrement.";
      setServerError(message);
    },
  });

  const onSubmit = (data: PropertyFormValues) => {
    setServerError(null); // On efface les erreurs précédentes
    mutation.mutate(data);
  };

  // gestion d'erreurs de validation
  const onInvalid = (errors: any) => {
    console.log("Erreurs de validation formulaire:", errors);
  };

  if (isEditMode && isLoading)
    return <div className="p-8 text-center">Chargement des données...</div>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Button
        variant="outline"
        className="mb-4 gap-2 pl-0 hover:bg-transparent hover:text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} /> Retour à la liste
      </Button>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-4 flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{serverError}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Modifier l'annonce" : "Créer une nouvelle annonce"}
          </CardTitle>
        </CardHeader>
        <CardContent>
   
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'annonce</Label>
              <Input
                id="title"
                placeholder="Ex: Loft lumineux à Paris"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input id="city" placeholder="Ex: Lyon" {...register("city")} />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="surface">Surface (m²)</Label>
                <Input
                  id="surface"
                  type="number"
                  placeholder="0"
                  {...register("surface", { valueAsNumber: true })}
                />
                {errors.surface && (
                  <p className="text-red-500 text-sm">
                    {errors.surface.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optionnel)</Label>
              <Textarea
                id="description"
                placeholder="Décrivez le bien..."
                className="min-h-[120px]"
                {...register("description")}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 cursor-pointer"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  Enregistrement...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save size={16} />{" "}
                  {isEditMode ? "Mettre à jour" : "Publier l'annonce"}
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
