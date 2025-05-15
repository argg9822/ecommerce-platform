import { Head } from "@inertiajs/react";
import { Brand, Category, Product } from "@/types";
import Authenticated from "@/layouts/AuthenticatedLayout";

//Libraries
import { useState } from 'react';

//Components
import PrimaryButton from '@/components/PrimaryButton';

//Components Form
import { 
    MainInformationCard, 
    CategoryCard, 
    PricingCard,
    ImagesCard
} from '@/pages/Products/components/ProductForm';
import BrandForm from '@/pages/Brands/Partials/BrandForm';

import CategoryForm from '@/pages/Categories/Partials/CategoryForm';

//Hooks
import useProductForm from '@/hooks/form/useProductForm';

//Context
import { ProductFormContext } from '@/context/product-form.context';

//UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CreateProductProps = {
    categories: Category[],
    brands: Brand[],
}

export default function Create({ categories, brands }: CreateProductProps) {
    const form = useProductForm();

    const {
        storeProduct,
        processing,
    } = useProductForm();

    const [openCategories, setOpenCategories] = useState(false);

    const categoryList = categories.map((category) => {
        return { value: category.id, label: category.name }
    });

    const [openDialogCategory, setOpenDialogCategory] = useState(false);
    const [openDialogBrand, setOpenDialogBrand] = useState(false);

    return (
        <Authenticated>
            <Head title="Agregar producto" />

            <ProductFormContext.Provider value={form}>
                <form onSubmit={storeProduct} encType="multipart/form-data">
                    <section className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 mt-8">

                        {/* Información principal */}
                        <MainInformationCard
                            brands={brands}
                            setOpenDialogBrand={setOpenDialogBrand}
                        />

                        {/* Imágenes */}
                        <ImagesCard />

                        {/* Precios y stock */}
                        <PricingCard />

                        {/* Características adicionales */}
                        <CategoryCard
                            setOpenDialogCategory={setOpenDialogCategory}
                            categories={categories}
                        />
                    </section>

                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton
                            type="submit"
                            className="ml-4"
                            disabled={processing}
                        >Guardar
                        </PrimaryButton>
                    </div>
                </form>
            </ProductFormContext.Provider>

            <Dialog open={openDialogCategory} onOpenChange={setOpenDialogCategory}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-gray-100'>Agregar categoría</DialogTitle>
                        <DialogDescription>Considera utilizar nombres de categoría claros y descriptivos para mejorar la organización de tu catálogo.</DialogDescription>
                    </DialogHeader>
                    <CategoryForm categories={categories} openDialog={setOpenDialogCategory} />
                </DialogContent>
            </Dialog>

            <Dialog open={openDialogBrand} onOpenChange={setOpenDialogBrand}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-gray-100">Agregar marca</DialogTitle>
                    </DialogHeader>
                    <BrandForm openDialog={setOpenDialogBrand} />
                </DialogContent>
            </Dialog>

        </Authenticated>
    );
}