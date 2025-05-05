import { Upload, X } from "lucide-react";
import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Button } from "./ui/button";

interface UploadImagesProps {
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    onFilesSelected?: (files: File[]) => void;
    onFileRemove?: (index: number) => void;
    preview?: boolean;
    className?: string;
    maxSizeInMB?: number
}

export default function UploadImages({
    onFilesSelected, 
    onFileRemove, 
    multiple = false, 
    maxFiles = 5, 
    accept = 'image/*', 
    preview = false,
    className = '',
    maxSizeInMB = 2
} : UploadImagesProps){
    const [images, setImages] = useState<File[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const triggerImageInput = () => {
        imageInputRef.current?.click();
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
            handleFiles(e.dataTransfer.files);
        }
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFiles(e.target.files);
        }
    };

    const handleFiles = (newFiles: FileList) => {
        const filesArray = Array.from(newFiles).slice(0, maxFiles - images.length);

        if (filesArray.length > 0) {
            const updatedFiles = multiple ? [...images, ...filesArray] : [filesArray[0]];

            filesArray.forEach(file => {
                if (file.size > maxSizeInMB * 1024 * 1024) {
                    alert(`El archivo debe pesar menos de ${maxSizeInMB}MB.`);
                    return;
                }
            })
            
            setImages(updatedFiles);
            onFilesSelected?.(updatedFiles);
        }
    }

    const removeImage = (index: number) => {        
        const newImages = [...images].filter((image, key) => key !== index);
        setImages(newImages);
        if (onFileRemove) {
            onFileRemove(index);    
        }
    }

    const formatAccept = () => {
        if (accept !== 'image/*') {
            return accept.split(",").map(string => string.replace('image/', ".")).join(",");
        }else{
            return "Formatos de imagen";
        }
    }

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <div 
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-lg p-4 flex flex-row text-gray-400 cursor-pointer bg-secondary"
                onClick={triggerImageInput}
            >
                <div className="flex items-center mr-4">
                    <Upload className='h-4 w-4 text-white'/>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-100">
                        Arrastra {multiple ? 'imágenes' : 'una imagen'} aquí o haz click para seleccionar <b>{multiple &&  `(Max. ${maxFiles})`}</b>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Formatos aceptados: {formatAccept()}
                    </div>
                </div>
            </div>

            <input
                type="file"
                ref={imageInputRef}
                accept={accept}
                className='hidden'
                multiple={multiple}
                onChange={handleImageUpload}
            />

            {preview && images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-content-center">
                    {images.map((image, index) => (
                        <div key={index} className='relative'>
                            <div className='aspect-square overflow-hidden rounded-lg border'>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index + 1}`}
                                    className='object-cover w-full h-full'
                                />
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                            <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                {index === 0 ? "Principal" : index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}