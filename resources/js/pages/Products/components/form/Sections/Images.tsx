import {
  Card,
  CardContent
} from "@/components/ui/card";
import UploadImages from '@/components/UploadImages';
import { useProductFormContext } from "@/context/product-form.context";

export default function Images(){
    const {
        data,
        setData
    } = useProductFormContext();
    
    const productImagesValue = (newImages: File[]) => {
        setData('new_images', [...data.images, ...newImages]);
    }

    return (
        <Card>
            <CardContent className='space-y-4'>
                <UploadImages
                    multiple
                    preview
                    maxFiles={5}
                    existingImages={data.images}
                    onFilesSelected={(files) => setData('new_images', files)}
                    onExistingImageRemove={(id) => {
                        // Opcional: puedes agregar el id a una lista para eliminarlo después en el backend
                    }}
                />
            </CardContent>
        </Card>
    )
}