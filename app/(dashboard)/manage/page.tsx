"use client";

import CreateCategoryDialog from "@/app/(dashboard)/_components/CreateCategoryDialog";
import DeleteCategoryDialog from "@/app/(dashboard)/_components/DeleteCategoryDialog";
import CreateGrowerDialog from "@/app/(dashboard)/_components/CreateGrowerDialog";
import DeleteGrowerDialog from "@/app/(dashboard)/_components/DeleteGrowerDialog";
// import CreateStrainDialog from "@/app/(dashboard)/_components/CreateStrainDialog";
// import DeleteStrainDialog from "@/app/(dashboard)/_components/DeleteStrainDialog";
import { WeightComboBox } from "@/components/WeightComboBox";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Category, Product } from "@prisma/client";
// import { Strain } from "@prisma/client";
import { Grower } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
//START needed for deleting product 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct } from "@/app/(dashboard)/inventory/_actions/deleteProduct";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { ReactNode, useState } from "react";
//END
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from "lucide-react";
import { CreateProduct } from "../_actions/new-products";
// import CreateProductDialog from "../_components/CreateProductDialog";
import CreateProductDialog from "@/app/(dashboard)/_components/CreateProductDialog";
// import DeleteProductDialog from "@/app/(dashboard)/_components/DeleteGrowerDialog";
// import DeleteProductDialog from "@/app/(dashboard)/inventory/_components/DeleteProductDialog";
//needed for deleting product (see DeleteProductDialog in dashboard/_components)
interface Props {
  trigger: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string;
}
function DeleteProductDialog({ productId, trigger }: Props) {
  // const productIdentifier = `${product.product}`;
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: async () => {
      toast.success("Product deleted successfully", {
        id: productId,
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: productId,
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting product...", {
                id: productId,
              });
              deleteMutation.mutate(productId);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
function page() {
  return (
    <>
      {/* HEADER */}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Manage</p>
            <p className="text-muted-foreground">
              Manage your account settings and categories
            </p>
          </div>
        </div>
      </div>
      {/* END HEADER */}
      <div className="container flex flex-col gap-4 p-4">
        {/* <Card>
          <CardHeader>
            <CardTitle>Weight</CardTitle>
            <CardDescription>
              Set your default weight for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeightComboBox />
          </CardContent>
        </Card> */}
        <ProductList />
        <GrowerList  />
        <CategoryList  />
     
        
       
        
      
      </div>
    </>
  );
}

export default page;
function ProductList() {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`/api/products`).then((res) => res.json()),
  });

  const dataAvailable = productsQuery.data && productsQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={productsQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
             
              <div>
                 strains
                <div className="text-sm text-muted-foreground">
                  Sorted by name
                </div>
              </div>
            </div>

            <CreateProductDialog
            
              successCallback={() => productsQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create strain
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              No
              <span
                className={cn(
                  "m-1",
                 "text-emerald-500" 
                )}
              >
              
              </span>
              strains yet
            </p>

            <p className="text-sm text-muted-foreground">
              Create one to get started
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productsQuery.data.map((product: Product) => (
              <ProductCard product={product} key={product.product} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        {/* <span className="text-3xl" role="img">
          {category.icon}
        </span> */}
        <span>{product.product}</span>
      </div>
      <DeleteProductDialog
              open={showDeleteDialog}
              setOpen={setShowDeleteDialog}
        productId={product.id.toString()}
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
            variant={"secondary"}
          >
            <TrashIcon className="h-4 w-4" />
            Remove
          </Button>
        }
      />
    </div>
  );
}

function CategoryList() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`/api/categories`).then((res) => res.json()),
  });

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
             
              <div>
                 categories
                <div className="text-sm text-muted-foreground">
                  Sorted by name
                </div>
              </div>
            </div>

            <CreateCategoryDialog
            
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              No
              <span
                className={cn(
                  "m-1",
                 "text-emerald-500" 
                )}
              >
              
              </span>
              categories yet
            </p>

            <p className="text-sm text-muted-foreground">
              Create one to get started
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        {/* <span className="text-3xl" role="img">
          {category.icon}
        </span> */}
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
            variant={"secondary"}
          >
            <TrashIcon className="h-4 w-4" />
            Remove
          </Button>
        }
      />
    </div>
  );
}

function GrowerList() {
  const growersQuery = useQuery({
    queryKey: ["growers"],
    queryFn: () =>
      fetch(`/api/growers`).then((res) => res.json()),
  });

  const dataAvailable = growersQuery.data && growersQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={growersQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
             
              <div>
                growers
                <div className="text-sm text-muted-foreground">
                  Sorted by name
                </div>
              </div>
            </div>

            <CreateGrowerDialog
          
              successCallback={() => growersQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create grower
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              No
              <span
                className={cn(
                  "m-1",
                "text-emerald-500" 
                )}
              >
                
              </span>
              growers yet
            </p>

            <p className="text-sm text-muted-foreground">
              Create one to get started
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {growersQuery.data.map((grower: Grower) => (
              <GrowerCard grower={grower} key={grower.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function GrowerCard({ grower }: { grower: Grower }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        {/* <span className="text-3xl" role="img">
          {grower.icon}
        </span> */}
        <span>{grower.name}</span>
      </div>
      <DeleteGrowerDialog
        grower={grower}
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
            variant={"secondary"}
          >
            <TrashIcon className="h-4 w-4" />
            Remove
          </Button>
        }
      />
    </div>
  );
}

// function StrainList() {
//   const strainsQuery = useQuery({
//     queryKey: ["strains"],
//     queryFn: () =>
//       fetch(`/api/strains`).then((res) => res.json()),
//   });

//   const dataAvailable = strainsQuery.data && strainsQuery.data.length > 0;

//   return (
//     <SkeletonWrapper isLoading={strainsQuery.isLoading}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-2">
            
//               <div>
//                strains
//                 <div className="text-sm text-muted-foreground">
//                   Sorted by name
//                 </div>
//               </div>
//             </div>

//             <CreateStrainDialog
        
//               successCallback={() => strainsQuery.refetch()}
//               trigger={
//                 <Button className="gap-2 text-sm">
//                   <PlusSquare className="h-4 w-4" />
//                   Create strain
//                 </Button>
//               }
//             />
//           </CardTitle>
//         </CardHeader>
//         <Separator />
//         {!dataAvailable && (
//           <div className="flex h-40 w-full flex-col items-center justify-center">
//             <p>
//               No
//               <span
//                 className={cn(
//                   "m-1",
//                 "text-emerald-500"
//                 )}
//               >
              
//               </span>
//               strains yet
//             </p>

//             <p className="text-sm text-muted-foreground">
//               Create one to get started
//             </p>
//           </div>
//         )}
//         {dataAvailable && (
//           <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {strainsQuery.data.map((strain: Strain) => (
//               <StrainCard strain={strain} key={strain.name} />
//             ))}
//           </div>
//         )}
//       </Card>
//     </SkeletonWrapper>
//   );
// }

// function StrainCard({ strain }: { strain: Strain }) {
//   return (
//     <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
//       <div className="flex flex-col items-center gap-2 p-4">
//         {/* <span className="text-3xl" role="img">
//           {strain.icon}
//         </span> */}
//         <span>{strain.name}</span>
//       </div>
//       <DeleteStrainDialog
//         strain={strain}
//         trigger={
//           <Button
//             className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-red-500/20"
//             variant={"secondary"}
//           >
//             <TrashIcon className="h-4 w-4" />
//             Remove
//           </Button>
//         }
//       />
//     </div>
//   );
// }