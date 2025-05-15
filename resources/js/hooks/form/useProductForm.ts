import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useRef } from 'react';
import { ProductForm } from '@/types/index';

type ProductFormData = ProductForm & Record<string, any>;

export default function useProductForm() {
    const tenantNameRef = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<ProductFormData>({
        name: '',
        description: '',
        price: null,
        compare_price: null,
        stock: 0,
        sku: '',
        barcode: '',
        is_feature: false,
        is_available: false,
        brand_id: 0,
        category_id: 0,
        features: [],
        product_images: [],
        new_images: [],
        shipment: null,
        currency: 'COP'
    });

    const storeProduct: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('products_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset();
                    tenantNameRef.current?.focus();
                }

                if (errors.brand) reset('brand_id');
                if (errors.price) reset('price');
                if (errors.compare_price) reset('compare_price');
                if (errors.stock) reset('stock');
                if (errors.shipment) reset('shipment');
                if (errors.sku) reset('sku');
                if (errors.barcode) reset('barcode');
                if (errors.category_id) reset('category_id');
                if (errors.is_feature) reset('is_feature');
            }
        });
    }

    const handleNumberChangeInput = (e: ChangeEvent<HTMLInputElement>, key: keyof ProductForm) => {
        const number = e.target.value;
        const parsed = e.target.step === '0.01' ? parseFloat(number) : parseInt(number);
        setData(key, isNaN(parsed) ? 0 : parsed);
    }

    const handleNumberChangeSelect = (value: string, key: keyof ProductForm) => {
        const parsed = parseInt(value);
        setData(key, isNaN(parsed) ? 0 : parsed);
    }

    return {
        storeProduct,
        data,
        setData,
        handleNumberChangeInput,
        handleNumberChangeSelect,
        errors,
        processing,
        recentlySuccessful,
    }
}