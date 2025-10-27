import { useState } from 'react';
import { Head } from "@inertiajs/react";
import { Brand, Category } from "@/types";
import Authenticated from "@/layouts/AuthenticatedLayout";
import { 
    MainInformation, 
    Variants, 
    Inventory,
    Images,
    StoreFront,
    SeoDetails
} from '@/pages/Products/components/form/Sections';
import BrandForm from '@/pages/Brands/Partials/BrandForm';
import useProductForm from '@/hooks/form/useProductForm';
import { ProductFormContext } from '@/context/product-form.context';

//UI components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PrimaryButton from '@/components/PrimaryButton';
import { ProductForm } from '@/types/product-form.type';
import CategoryFormDialog from '@/components/form/CategoryFormDialog';

type CreateProductProps = {
    mode: 'create' | 'edit',
    categories: Category[],
    brands: Brand[],
    product?: ProductForm,
    unavailableRelevances: number[],
}

export default function ProductEditor({ mode, categories, brands, product, unavailableRelevances }: CreateProductProps) {
    const form = useProductForm(product || undefined);
    const isEditMode = mode === 'edit';
    const [openDialogCategory, setOpenDialogCategory] = useState(false);
    const [openDialogBrand, setOpenDialogBrand] = useState(false);

    return (
        <Authenticated>
            <Head title={ isEditMode ? "Editar producto" : "Agregar producto" } />

            <ProductFormContext.Provider value={form}>
                <form onSubmit={form.submit} encType="multipart/form-data">
                    <section className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 mt-8">

                        {/* Información principal */}
                        <MainInformation
                            brands={brands}
                            setOpenDialogBrand={setOpenDialogBrand}
                            setOpenDialogCategory={setOpenDialogCategory}
                            categories={categories}
                        />

                        {/* Precios y stock */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Precio e inventario</h3>
                                    <p className="text-gray-400">Seguimiento del inventario</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Inventory />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Características adicionales */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Características del producto (Obligatorio)</h3>
                                    <p className="text-gray-400">Especifica al menos una variante para el producto</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Variants />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Imágenes */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Imágenes (obligatorio)</h3>
                                    <p className="text-gray-400">Agrega imágenes de tus productos para llamar la atención de tus clientes</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Images />
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
                                    <StoreFront unavailableRelevances={unavailableRelevances} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Detalles del SEO */}
                        <Accordion type="single" collapsible className="w-full accordion-cards">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex flex-col text-gray-100">
                                    <h3 className="accordion-cards-title">Configuración del SEO (opcional)</h3>
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
                            disabled={form.processing}
                        >Guardar
                        </PrimaryButton>
                    </div>
                </form>
            </ProductFormContext.Provider>

            {/* Modal para agregar categoría */}
            <CategoryFormDialog isOpen={openDialogCategory} setIsOpen={setOpenDialogCategory} />

            {/* Modal para agregar marca */}
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