import { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);
    const [error, setError] = useState('');

    const loadSales = async () => {
        try {
            const salesUrl = await fetch('http://localhost:8090/api/sales/');
            if (!salesUrl.ok) {
                throw new Error('Failed to load sales data.');
            }
            const salesData = await salesUrl.json();
            setSales(salesData.sales);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadSales();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Sales</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(sale => (
                                    <tr key={sale.id}>
                                        <td>{sale.salesperson.employee_id}</td>
                                        <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                                        <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>{sale.price}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesList;
