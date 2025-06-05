import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useRef } from 'react';
import { ProductForm } from '@/types/product-form.type';
import { ColorOptionsType, ProductVariantsType } from '@/types/product';

type ProductFormData = ProductForm & Record<string, any>;

const BASE_COLOR_OPTIONS: ColorOptionsType[] = [
    { value: "red", label: "Rojo", color: "text-red-600", selected: false },
    { value: "silver", label: "Plateado", color: "text-gray-500", selected: false },
    { value: "blue", label: "Azul", color: "text-blue-500", selected: false },
    { value: "green", label: "Verde", color: "text-green-600", selected: false },
    { value: "yellow", label: "Amarillo", color: "text-yellow-400", selected: false },
    { value: "purple", label: "Morado", color: "text-purple-400", selected: false },
    { value: "pink", label: "Rosado", color: "text-pink-400", selected: false },
];

export default function useProductForm( product? : ProductForm ) {    
    
    const refs: Record<string, React.RefObject<HTMLInputElement> | undefined> = {
        name: useRef<HTMLInputElement>(null),
        brand_id: useRef<HTMLInputElement>(null),
        description: useRef<HTMLInputElement>(null),
        categories: useRef<HTMLInputElement>(null),
        price: useRef<HTMLInputElement>(null),
        compare_price: useRef<HTMLInputElement>(null),
        cost: useRef<HTMLInputElement>(null),
        shipment: useRef<HTMLInputElement>(null),
        stock: useRef<HTMLInputElement>(null),
        sku: useRef<HTMLInputElement>(null),
        barcode: useRef<HTMLInputElement>(null),
    };
    
    const createColorOptions = () => JSON.parse(JSON.stringify(BASE_COLOR_OPTIONS));
    const BASE_NEW_VARIANT: ProductVariantsType = {
        price: undefined,
        currency_price: 'COP',
        compare_price: undefined,
        stock: 0,
        shipment: undefined,
        dimensions: {
            length: {
                value: 0,
                unit: 'cm',
            },
            width: {
                value: 0,
                unit: 'cm',
            },
            height: {
                value: 0,
                unit: 'cm',
            },
            weight: {
                value: 0,
                unit: 'kg',
            }
        },
        colors: createColorOptions(),
        variant_attributes: [{name: '', value: ''}],
        is_available: true,
    }

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<ProductFormData>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || undefined,
        compare_price: product?.compare_price || undefined,
        cost: product?.cost || undefined,
        stock: product?.stock || 0,
        sku: product?.sku || '',
        barcode: product?.barcode || '',
        is_feature: product?.is_feature || false,
        is_available: product?.is_available || true,
        relevance: product?.relevance || 0,
        brand_id: product?.brand_id || 1,
        shipment: product?.shipment || undefined,
        meta_title: product?.meta_title || '',
        meta_description: product?.meta_description || '',
        key_words: product?.key_words || '',
        condition: product?.condition || 'new',
        show_condition: product?.show_condition || true,
        warranty_policy: product?.warranty_policy || '',
        disponibility_text: product?.disponibility_text || '',

        categories: [],
        profit: undefined,
        variants: [BASE_NEW_VARIANT],
        images: [],
        currency: 'COP',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('products_store'), {
            preserveScroll: false,
            onSuccess: () => {
                alert('Guardado')
                // reset()
            },
            onError: (errors) => {
                const fieldNames = [
                    'name',
                    'brand_id',
                    'description',
                    'categories',
                    'is_available',
                    'price',
                    'compare_price',
                    'cost',
                    'shipment',
                    'stock',
                    'sku',
                    'barcode',
                    'is_feature',
                    'relevance',
                    'warranty_policy',
                    'condition',        
                    'show_condition',
                    'disponibility_text',
                    'meta_title',
                    'key_words',
                    'meta_description',
                ];

                const firstError = fieldNames.find(field => errors[field]);

                if (firstError) {
                    refs[firstError]?.current?.focus();
                }
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
        createColorOptions,
        refs
    }
}