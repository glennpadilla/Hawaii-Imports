import { useEffect, useState } from 'react';

function CustomerList() {
    const [customers, setCustomers] = useState([])

    const loadCustomers = async () => {
        const customersUrl = await fetch('http://localhost:8090/api/customers/');
        if (customersUrl.ok) {
            const customerData = await customersUrl.json();
            setCustomers(customerData.customers)
        }
    }

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>List of All Customers</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customers => {
                                return (
                                    <tr key={customers.id}>
                                        <td>{ customers.first_name }</td>
                                        <td>{ customers.last_name }</td>
                                        <td>{ customers.phone_number }</td>
                                        <td>{ customers.address }</td>
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

export default CustomerList;
