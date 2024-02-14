import { useEffect, useState } from 'react';

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const [salespeople, setSalespeople] = useState([]);

    const loadSales = async () => {
        const salesUrl = await fetch('http://localhost:8090/api/sales/');
        if (salesUrl.ok) {
            const salesData = await salesUrl.json();
            setSales(salesData.sales);
        }
    };

    const loadSalespeople = async () => {
        const salespeopleUrl = await fetch('http://localhost:8090/api/salespeople/');
        if (salespeopleUrl.ok) {
            const salespeopleData = await salespeopleUrl.json();
            setSalespeople(salespeopleData.salespeople);
        }
    };

    useEffect(() => {
        loadSales();
        loadSalespeople();
    }, []);

    function handleSelection(e) {
        setSelectedSalesperson(e.target.value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>View a Salesperson's History</h1>
                    <select className="form-select" aria-label="Default select example" onChange={handleSelection}>
                        <option value="">Select a Salesperson</option>
                        {salespeople.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>
                                    {`${salesperson.first_name} ${salesperson.last_name}`}
                                </option>
                            )
                        })}
                    </select>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales
                                .filter(sale => sale.salesperson.id == selectedSalesperson)
                                .map(sale => (
                                    <tr key={sale.id}>
                                        <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                                        <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>{sale.price}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SalespersonHistory;
