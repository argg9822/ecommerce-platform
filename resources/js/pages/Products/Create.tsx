import { useState } from 'react';
import { Head } from "@inertiajs/react";
import { Brand, Category } from "@/types";
import Authenticated from "@/layouts/AuthenticatedLayout";
import { 
    MainInformationCard, 
    ProductSpecificationsCard, 
    InventoryCard,
    ImagesCard
} from '@/pages/Products/components/ProductForm';
import BrandForm from '@/pages/Brands/Partials/BrandForm';
import CategoryForm from '@/pages/Categories/Partials/CategoryForm';
import useProductForm from '@/hooks/form/useProductForm';
import { ProductFormContext } from '@/context/product-form.context';

//UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import PrimaryButton from '@/components/PrimaryButton';
import StoreFrontCard from './components/ProductForm/StoreFrontCard';
import SeoDetails from './components/ProductForm/SeoDetails';

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
                            setOpenDialogCategory={setOpenDialogCategory}
                            categories={categories}
                        />

                        {/* Características adicionales */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Variantes (opcional)</h3>
                                    <p className="text-gray-400">Especificaciones del producto</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ProductSpecificationsCard />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Precios y stock */}
                         <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Inventario (opcional)</h3>
                                    <p className="text-gray-400">Seguimiento del inventario</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <InventoryCard />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Imágenes */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Imágenes (obligatorio)</h3>
                                    <p className="text-gray-400">Agrega imágenes de tus productos para llamar la atención de los clientes</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ImagesCard />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Detalles del storefront */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Detalles del storefront (obligatorio)</h3>
                                    <p className="text-gray-400">Configura lo que los clientes verán en el storefront.</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <StoreFrontCard />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Detalles del SEO */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Configuración del SEO</h3>
                                    <p className="text-gray-400">Aumenta el tráfico de tu negocio en línea</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <SeoDetails />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
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