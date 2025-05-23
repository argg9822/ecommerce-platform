import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useEffect, useRef } from 'react';
import { ProductForm } from '@/types/product-form.type';

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
        price: undefined,
        compare_price: undefined,
        cost: undefined,
        stock: 0,
        sku: '',
        barcode: '',
        is_feature: false,
        is_available: true,
        relevance: 0,
        brand_id: undefined,
        shipment: undefined,
        meta_title: '',
        meta_description: '',
        key_words: '',
        condition: 'new',
        show_condition: false,
        warranty_policy: '',
        disponibility_text: '',

        categories: [],
        profit: undefined,
        variants: [],
        product_images: [],
        currency: 'COP',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('products_store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.name) {
                    reset();
                    tenantNameRef.current?.focus();
                }
                if (errors.description) reset('description');
                if (errors.price) reset('price');
                if (errors.compare_price) reset('compare_price');
                if (errors.cost) reset('cost');
                if (errors.shipment) reset('shipment');
                if (errors.stock) reset('stock');
                if (errors.category_id) reset('category_id');
                if (errors.brand_id) reset('brand_id');
                if (errors.sku) reset('sku');
                if (errors.barcode) reset('barcode');
                if (errors.features) reset('features');
                if (errors.is_feature) reset('is_feature');
                if (errors.is_available) reset('is_available');
                if (errors.condition) reset('condition');
                if (errors.show_condition) reset('show_condition');
                if (errors.key_words) reset('key_words');
                if (errors.product_images) reset('product_images');
                if (errors.warranty_policy) reset('warranty_policy');
                if (errors.relevance) reset('relevance');
                if (errors.disponibility_text) reset('disponibility_text');
                if (errors.meta_title) reset('meta_title');
                if (errors.meta_description) reset('meta_description');
            },
        });
    };

    const handleNumberChangeInput = (e: ChangeEvent<HTMLInputElement>, key: keyof ProductForm) => {
        const number = e.target.value;
        const parsed = e.target.step === '0.01' ? parseFloat(number) : parseInt(number);
        setData(key, isNaN(parsed) ? 0 : parsed);
    }

    const handleNumberChangeSelect = (value: string, key: keyof ProductForm) => {
        const parsed = parseInt(value);
        setData(key, isNaN(parsed) ? 0 : parsed);
    }

    const handleProfit = (e: React.ChangeEvent<HTMLInputElement>, field: "price" | "cost") => {
        handleNumberChangeInput(e, field);
        const cost_product = field === 'cost' ? parseFloat(e.target.value) : data.cost;
        const price = field === 'price' ? parseFloat(e.target.value) : data?.price;
        const profit = (price ?? 0) - (cost_product ?? 0);
        setData('profit', profit);
    }

    return {
        data,
        setData,
        errors,
        processing,
        recentlySuccessful,
        submit,
        reset,
        handleProfit,
        handleNumberChangeInput,
        handleNumberChangeSelect,
    }
}