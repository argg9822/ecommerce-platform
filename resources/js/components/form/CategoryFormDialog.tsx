import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from '@/pages/Categories/Partials/CategoryForm';
import { Category } from "@/types/category";

export default function CategoryFormDialog({ setIsOpen, isOpen, category }: { isOpen: boolean, setIsOpen: (open: boolean) => void, category?: Category | null }) {    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-gray-100'>Agregar categoría</DialogTitle>
                    <DialogDescription>Considera utilizar nombres de categoría claros y descriptivos para mejorar la organización de tu catálogo.</DialogDescription>
                </DialogHeader>
                <CategoryForm openDialog={setIsOpen} category={category} />
            </DialogContent>
        </Dialog>
    )
}