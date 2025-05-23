import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UploadImages from '@/components/UploadImages';
import { useProductFormContext } from "@/context/product-form.context";
import { log } from "node:console";

export default function ImagesCard(){
    const {
        data,
        setData
    } = useProductFormContext();

    const productImagesValue = (newImages: File[]) => {
        setData('new_images', [...data.product_images, ...newImages]);
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