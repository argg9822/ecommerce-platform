import { ProductProps } from '../../types/ProductProps';

type Props = {
    products: ProductProps[];
};

function ProductTable({ products }: Props) {
    return (
        <table className = "min-w-full divide-y divide-gray-400 text-sm">
            <thead className='bg-gray-900 text-gray-50'>
                <tr>
                    <th className="px-4 py-3 text-left font-semibold">ID</th>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Descripción</th>
                    <th className="px-4 py-3 text-left font-semibold">Price</th>
                </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-700 text-gray-800">
                {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-300 transition-colors">
                        <td className="px-4 py-3">{product.id}</td>
                        <td className="px-4 py-3">{product.title}</td>
                        <td className="px-4 py-3">{product.description}</td>
                        <td className="px-4 py-3">${product.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;