import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function StatusDialog({ openDialogChangeOrderStatus } : { openDialogChangeOrderStatus: boolean }) {
    return (
        <AlertDialog open={openDialogChangeOrderStatus}>
            <AlertDialogContent className="bg-zinc-900 text-white border border-zinc-500">
                <AlertDialogHeader>
                    <div className="flex items-center gap-2 text-red-500">
                        <AlertDialogTitle className="text-lg font-bold">¿Estás seguro?</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="mt-2 text-sm text-gray-300">
                        Este producto y todos sus datos relacionados serán eliminados.
                        <span className="text-red-400 font-semibold"> Tendrás 30 días para deshacer esta acción.</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="bg-gray-700 hover:bg-gray-600 text-white"
                        onClick={() => {
                            setOpenDialogChangeOrderStatus(false);
                            setDeleteProductId(0);
                        }}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white shadow-md"
                        disabled={processing}
                        onClick={handleDeleteProduct}
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}