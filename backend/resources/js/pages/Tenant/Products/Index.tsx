import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

export default function Index() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Productos
        </h2>
      }>
        <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Productos</h1>
        <p>Esta es la página de productos.</p>
        </div>
    </AuthenticatedLayout>
  );
}