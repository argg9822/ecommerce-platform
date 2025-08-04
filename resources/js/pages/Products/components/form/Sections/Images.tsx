import InputError from "@/components/InputError";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import UploadImages from '@/components/UploadImages';
import { useProductFormContext } from "@/context/product-form.context";

export default function Images(){
    const {
        data,
        setData,
        errors,
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
                        setData('drop_images', [...data.drop_images, id]);
                    }}
                />

                <InputError message={errors.new_images} />
            </CardContent>
        </Card>
    )
}