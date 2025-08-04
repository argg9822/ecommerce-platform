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
    maxSizeInMB?: number;
    existingImages?: { id: number; url: string }[];
    onExistingImageRemove?: (id: number) => void;
}

export default function UploadImages({
    onFilesSelected,
    onFileRemove,
    multiple = false,
    maxFiles = 5,
    accept = 'image/*',
    preview = false,
    className = '',
    maxSizeInMB = 2,
    existingImages = [],
    onExistingImageRemove,
}: UploadImagesProps) {
    const [images, setImages] = useState<File[]>([]);
    const [existing, setExisting] = useState(existingImages);

    const imageInputRef = useRef<HTMLInputElement>(null);

    const triggerImageInput = () => {
        imageInputRef.current?.click();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (newFiles: FileList) => {
        const filesArray = Array.from(newFiles).slice(0, maxFiles - (images.length + existing.length));
        const oversized = filesArray.filter(file => file.size > maxSizeInMB * 1024 * 1024);

        if (oversized.length > 0) {
            alert(`Las imágenes deben pesar menos de ${maxSizeInMB}MB.`);
            return;
        }

        const updatedFiles = multiple ? [...images, ...filesArray] : [filesArray[0]];
        setImages(updatedFiles);
        onFilesSelected?.(updatedFiles);
    };

    const removeImage = (index: number) => {
        const newImages = [...images].filter((_, key) => key !== index);
        setImages(newImages);
        onFileRemove?.(index);
    };

    const removeExistingImage = (id: number) => {
        const updated = existing.filter(img => img.id !== id);
        setExisting(updated);
        onExistingImageRemove?.(id);
    };

    const formatAccept = () => {
        return accept !== 'image/*'
            ? accept.split(',').map(ext => ext.replace('image/', '.')).join(', ')
            : 'Formatos de imagen';
    };

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-lg p-4 flex flex-row text-gray-400 cursor-pointer bg-secondary"
                onClick={triggerImageInput}
            >
                <div className="flex items-center mr-4">
                    <Upload className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-100">
                        Arrastra {multiple ? 'imágenes' : 'una imagen'} aquí o haz click para seleccionar <b>{multiple && `(Max. ${maxFiles})`}</b>
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
                className="hidden"
                multiple={multiple}
                onChange={handleImageUpload}
            />

            {(preview && (existing.length > 0 || images.length > 0)) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-content-center">
                    {/* EXISTING IMAGES */}
                    {existing.map((img, index) => (
                        <div key={`existing-${img.id}`} className="relative">
                            <div className="aspect-square overflow-hidden rounded-lg border">
                                <img
                                    src={route('tenant_media_owner', { path: img.url })}
                                    alt={`Imagen guardada ${index + 1}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white"
                                onClick={() => removeExistingImage(img.id)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                            <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                {index === 0 ? 'Principal' : index + 1}
                            </span>
                        </div>
                    ))}

                    {/* NEW UPLOADED IMAGES */}
                    {images.map((image, index) => (
                        <div key={`new-${index}`} className="relative">
                            <div className="aspect-square overflow-hidden rounded-lg border">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index + 1}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                            <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                {index + 1 + existing.length === 1 ? 'Principal' : index + 1 + existing.length}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}