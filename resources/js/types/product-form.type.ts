import useProductForm from '@/hooks/form/useProductForm';

export type ProductFormContextType = ReturnType<typeof useProductForm>;

// export type ProductFormContextType = {
//     storeProduct: ReturnType<typeof useProductForm>['storeProduct'],
//     data: ReturnType<typeof useProductForm>['data'],
//     setData: ReturnType<typeof useProductForm>['setData'],
//     handleNumberChangeInput: ReturnType<typeof useProductForm>['handleNumberChangeInput'],
//     handleNumberChangeSelect: ReturnType<typeof useProductForm>['handleNumberChangeSelect'],    
//     errors: ReturnType<typeof useProductForm>['errors'],
//     processing: ReturnType<typeof useProductForm>['processing'],
//     recentlySuccessful: ReturnType<typeof useProductForm>['recentlySuccessful'],
// }