import { Upload } from "lucide-react";

interface UploadImagesProps {
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    onFilesSelected: (files: File[]) => void;
}

export default function UploadImages({handleDrop, triggerFileInput, multiple = false} : UploadImagesProps){
    return (
        <div className='flex flex-col items-center gap-4'>
            <div 
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-lg p-4 flex text-center text-gray-400 cursor-pointer bg-secondary"
                onClick={triggerFileInput}
            >
                <Upload className='mr-2 h-4 w-4 text-white'/>
                Arrastra imágenes aquí o haz click para seleccionar
            </div>

            <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                className='hidden'
                multiple
                onChange={handleImageUpload}
            />

            <p className='text-sm text-gray-500 text-muted-foreground'>
                Puedes seleccionar múltiples imágenes (máx. 5)
            </p>            
        </div>
    );
}