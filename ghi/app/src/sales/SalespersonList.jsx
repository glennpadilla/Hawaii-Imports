import { useEffect, useState } from 'react';

function SalespersonList() {
    const [salespeople, setSalespeople] = useState([]);
    const [error, setError] = useState('');

    const loadSalespeople = async () => {
        try {
            const salespeopleUrl = await fetch('http://localhost:8090/api/salespeople/');
            if (salespeopleUrl.ok) {
                const salespeopleData = await salespeopleUrl.json();
                setSalespeople(salespeopleData.salespeople);
            } else {
                throw new Error('Failed to fetch salespeople');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadSalespeople()
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Salesperson</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salespeople.map(salesperson => {
                                return (
                                    <tr key={salesperson.id}>
                                        <td>{salesperson.employee_id}</td>
                                        <td>{salesperson.first_name}</td>
                                        <td>{salesperson.last_name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalespersonList;
