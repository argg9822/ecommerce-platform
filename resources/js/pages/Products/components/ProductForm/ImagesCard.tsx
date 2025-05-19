import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UploadImages from '@/components/UploadImages';
import { useProductFormContext } from "@/context/product-form.context";

export default function ImagesCard(){
    const {
        data,
        setData
    } = useProductFormContext();

    const productImagesValue = (newImages: File[]) => {
        setData('new_images', [...data.new_images, ...newImages]);
    }

    return (
        <Card>
            <CardContent className='space-y-4'>
                <UploadImages
                    multiple
                    preview
                    onFilesSelected={productImagesValue}
                />

            </CardContent>
        </Card>
    )
}