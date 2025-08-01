import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useRef } from 'react';
import { ProductForm } from '@/types/product-form.type';
import { ProductVariantsType } from '@/types/product';

type ProductFormData = ProductForm & Record<string, any>;

export default function useProductForm( product? : ProductForm ) {    
    console.log('product', product);
    
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

    const initDimensions = {
        length: { value: 0, unit: 'cm' },
        width: { value: 0, unit: 'cm' },
        height: { value: 0, unit: 'cm' },
        weight: { value: 0, unit: 'kg' }
    };

    const initColors = [
        { value: "red", label: "Rojo", color: "text-red-600", selected: false },
        { value: "silver", label: "Plateado", color: "text-gray-500", selected: false },
        { value: "blue", label: "Azul", color: "text-blue-500", selected: false },
        { value: "green", label: "Verde", color: "text-green-600", selected: false },
        { value: "yellow", label: "Amarillo", color: "text-yellow-400", selected: false },
        { value: "purple", label: "Morado", color: "text-purple-400", selected: false },
        { value: "pink", label: "Rosado", color: "text-pink-400", selected: false },
    ]
    
    const BASE_NEW_VARIANT: ProductVariantsType = {
        price: undefined,
        currency_price: 'COP',
        compare_price: undefined,
        stock: undefined,
        shipment: undefined,
        variant_attributes: {
            custom: [{name: '', value: ''}],
            dimensions: initDimensions,
            colors: initColors,
        },
        is_available: true,
    }

    const transformVariant = (variantFromDB: any): ProductVariantsType => {
        const dimensions = structuredClone(initDimensions);
        const colors = initColors.map(c => ({ ...c, selected: false }));
        const custom: { name: string; value: string }[] = [];

        for (const attr of variantFromDB.variant_attributes || []) {
            const name = attr.name?.toLowerCase();
            const value = attr.value;

            if (['length', 'width', 'height', 'weight'].includes(name)) {
                const num = parseFloat(value);
                if (!isNaN(num)) {
                    dimensions[name as keyof typeof dimensions].value = num;
                }
            } else if (name === 'color') {
                for (const color of colors) {
                    if (value.toLowerCase().includes(color.value.toLowerCase())) {
                        color.selected = true;
                    }
                }
            } else {
                custom.push({ name: attr.name, value });
            }
        }

        return {
            ...BASE_NEW_VARIANT,
            price: variantFromDB.price ?? undefined,
            compare_price: variantFromDB.compare_price ?? undefined,
            stock: variantFromDB.stock ?? undefined,
            shipment: variantFromDB.shipment ?? undefined,
            is_available: variantFromDB.is_available ?? true,
            variant_attributes: {
                custom: custom.length ? custom : [{ name: '', value: '' }],
                dimensions,
                colors,
            },
        };
    };

    const setVariants = () => {
        if (!product?.variants || product.variants.length === 0) {
            return [BASE_NEW_VARIANT];
        }

        return product.variants.map(transformVariant);
    };


    const discountCalc = (price: number, comparePrice: number) => {
        if (!price || !comparePrice || comparePrice === 0) return undefined;
        const discount = 100 - ((price * 100)/comparePrice);
        return Number(discount.toFixed(2));
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
        stock: product?.stock || undefined,
        sku: product?.sku || '',
        barcode: product?.barcode || '',
        is_feature: product?.is_feature || false,
        is_available: product?.is_available || true,
        relevance: typeof product?.relevance === 'number' ? product.relevance : 0,
        brand_id: typeof product?.brand_id === 'number' ? product.brand_id : 1,
        shipment: typeof product?.shipment === 'number' ? product.shipment : undefined,
        meta_title: product?.meta_title || '',
        meta_description: product?.meta_description || '',
        key_words: product?.key_words || '',
        condition: product?.condition || 'new',
        show_condition: product?.show_condition || true,
        warranty_policy: product?.warranty_policy || '',
        disponibility_text: product?.disponibility_text || '',

        categories: Array.isArray(product?.categories) ? product.categories : [],
        profit: (product?.price ?? 0) - (product?.cost ?? 0),
        discount: discountCalc((product?.price ?? 0), (product?.compare_price ?? 0)),
        variants: setVariants(),
        images: product?.images ?? [],
        currency: 'COP',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const urlRoute = product?.id ? route('products_update', { id: product.id }) : route('products_store');

        post(urlRoute, {
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
        setData(key, isNaN(parsed) ? undefined : parsed);
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

    const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleNumberChangeInput(e, 'discount');

        const price = parseFloat(data.price?.toString() || '0');
        const discount = parseFloat(e.target.value);

        if (!Number.isFinite(price) || !Number.isFinite(discount)) return;

        const discountedPrice = price * (1 - discount / 100);
        const comparePrice = 2 * price - discountedPrice;

        setData('compare_price', comparePrice);
    };

    const handleComparePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleNumberChangeInput(e, 'compare_price');
        const discountedPrice = parseFloat(e.target.value);
        const price = parseFloat(data.price?.toString() || '0');
        const discount = 100 - ((price * 100) / discountedPrice);
        setData('discount', isNaN(discount) ? 0 : parseFloat(discount.toFixed(3)));
    }

    return {
        data,
        setData,
        errors,
        processing,
        recentlySuccessful,
        BASE_NEW_VARIANT,
        submit,
        reset,
        handleProfit,
        handleDiscount,
        handleComparePrice,
        handleNumberChangeInput,
        handleNumberChangeSelect,
        refs
    }
}