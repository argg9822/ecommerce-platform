import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { CardFooter } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCouponForm } from "@/hooks/form/useCouponForm";
import { CouponFormContext } from "@/context/coupon-form.context";
import Conditions from '@/pages/Coupons/components/form/sections/Conditions';
import Main from '@/pages/Coupons/components/form/sections/Main';
import PrimaryButton from "@/components/PrimaryButton";
import UsageLimit from '@/pages/Coupons/components/form/sections/UsageLimit';

export default function Create() {
    const form = useCouponForm();

    return (
        <AuthenticatedLayout>
            <Head title="Crear cupón" />

            <CouponFormContext.Provider value={form}>
                <form onSubmit={form.submit} className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 mt-8">
                    <Main />

                    {/* Condiciones del cupón */}
                    <Accordion type="single" collapsible className="w-full accordion-cards">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="flex flex-col text-gray-100">
                                <h3 className="accordion-cards-title">Condiciones del cupón</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Conditions />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Límites de uso */}
                    <Accordion type="single" collapsible className="w-full accordion-cards">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="flex flex-col text-gray-100">
                                <h3 className="accordion-cards-title">Límite de uso</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <UsageLimit />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <CardFooter>
                        {/* Botones */}
                        <div className="flex justify-center">
                            <PrimaryButton>Guardar cupón</PrimaryButton>
                        </div>
                    </CardFooter>
                </form>
            </CouponFormContext.Provider>
        </AuthenticatedLayout>
    );
}
