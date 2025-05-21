import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useRef } from 'react';
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
        profit: undefined,
        show_condition: false,
        stock: 0,
        sku: '',
        warranty_policy: '',
        barcode: '',
        is_feature: false,
        is_available_product: true,
        relevance: 0,
        key_words: '',
        condition: 'nuevo',
        brand_id: 'Propia',
        category_id: 0,
        variants: [],
        product_images: [],
        new_images: [],
        shipment: undefined,
        currency: 'COP',
        disponibility_text: '',
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
                if (errors.description) reset('description');
                if (errors.category_id) reset('category_id');
                if (errors.is_available_product) reset('is_available_product');
                if (errors.price) reset('price');
                if (errors.compare_price) reset('compare_price');
                if (errors.cost) reset('cost');
                if (errors.shipment) reset('shipment');
                if (errors.stock) reset('stock');
                if (errors.sku) reset('sku');
                if (errors.barcode) reset('barcode');
                if (errors.is_feature) reset('is_feature');
                if (errors.key_words) reset('key_words');
                if (errors.warranty_policy) reset('warranty_policy');
                if (errors.condition) reset('condition');
                if (errors.show_condition) reset('show_condition');
                if (errors.disponibility_text) reset('disponibility_text');
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

    const handleProfit = (e: React.ChangeEvent<HTMLInputElement>, field: "price" | "cost") => {
        handleNumberChangeInput(e, field);
        const cost_product = field === 'cost' ? parseFloat(e.target.value) : data.cost;
        const price = field === 'price' ? parseFloat(e.target.value) : data?.price;
        const profit = (price ?? 0) - (cost_product ?? 0);
        setData('profit', profit);
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
        handleProfit
    }
}