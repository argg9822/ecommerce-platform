import Layout from '../../Components/Layout';

function ProductsInventory () {
    return (
        <Layout>
            <h1>Inventario</h1>
            <div className='w-full'>
                <table className="border-collapse border border-green-800 table-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="border border-green-600 ...">Producto</th>
                            <th className="border border-green-600 ...">SKU</th>
                            <th className="border border-green-600 ...">Entrante</th>
                            <th className="border border-green-600 ...">Comprometido</th>
                            <th className="border border-green-600 ...">Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td className="border border-green-600 ...">Colcón confory</td>
                            <td className="border border-green-600 ...">No hay</td>
                            <td className="border border-green-600 ...">2</td>
                            <td className="border border-green-600 ...">1</td>
                            <td className="border border-green-600 ...">0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default ProductsInventory;
