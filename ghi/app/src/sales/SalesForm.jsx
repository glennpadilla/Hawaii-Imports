import React, { useState, useEffect } from 'react';

function SalesForm(){
    const initialFormData = {
        automobile: '',
        salesperson: '',
        customer: '',
        price: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const [sales, setSales] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [autos, setAutomobiles] = useState([]);
    const [soldVins, setSoldVins] = useState([]);
    const [feedback, setFeedback] = useState([]);

    const loadSales = async () => {
        const salesData = await fetch('http://localhost:8090/api/sales/');
        if (salesData.ok) {
            const data = await salesData.json();
            setSales(data.sales);
        }
    };

    const loadCustomers = async () => {
        const customerData = await fetch('http://localhost:8090/api/customers/');
        if (customerData.ok) {
            const data = await customerData.json();
            setCustomers(data.customers);
        }
    };

    const loadSalespeople = async () => {
        const salespeopleData = await fetch('http://localhost:8090/api/salespeople/');
        if (salespeopleData.ok) {
            const data = await salespeopleData.json();
            setSalespeople(data.salespeople);
        }
    };

    const loadAuto = async () => {
        const autoData = await fetch('http://localhost:8100/api/automobiles/');
        if (autoData.ok) {
            const data = await autoData.json();
            setAutomobiles(data.autos);
        }
    };

    const loadSoldVins = async () => {
        const salesUrl = await fetch('http://localhost:8090/api/sales/');
        const salesData = await salesUrl.json();
        const vins = salesData.sales.map(sale => sale.automobile.vin);
        setSoldVins(vins);
    };

    function availableVins() {
        const forSaleVins = [];
        for (const auto of autos) {
            if (!soldVins.includes(auto.vin)) {
                forSaleVins.push(auto.vin);
            }
        }
        return forSaleVins;
    };

    useEffect( () => {
        loadSales();
        loadCustomers();
        loadSalespeople();
        loadAuto();
        loadSoldVins();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try {
            const salesData = await fetch(salesUrl, fetchConfig);
            if (!salesData.ok) {
                const errorData = await salesData.json();
                throw new Error(errorData.message);
            }
            setFormData(initialFormData);
            const soldAutoData = await salesData.json();
            setFeedback(`Sale created successfully! Sale ID: ${soldAutoData.id}`);
        } catch (error) {
            setFeedback(error.message);
        }
    };

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
        setFeedback('');
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a Sale</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <div className="mb-3">
                            <select
                                value={formData.automobile}
                                onChange={handleFormChange}
                                required
                                name="automobile"
                                id="automobile"
                                className="form-select"
                            >
                                <option value="">Automobile VIN...</option>
                                {availableVins().map(vin => (
                                    <option key={vin} value={vin}>
                                        {vin}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select
                                value={formData.salesperson}
                                onChange={handleFormChange}
                                name="salesperson"
                                id="salesperson"
                                className="form-select"
                                required
                            >
                                <option value="">Salesperson...</option>
                                {salespeople.map(salesperson => (
                                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                        {`${salesperson.first_name} ${salesperson.last_name}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select
                                value={formData.customer}
                                onChange={handleFormChange}
                                name="customer"
                                id="customer"
                                className="form-select"
                                required
                            >
                                <option value="">Customer...</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>
                                        {`${customer.first_name} ${customer.last_name}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.price}
                                onChange={handleFormChange}
                                type="text"
                                name="price"
                                id="price"
                                className="form-control"
                                required
                            />
                            <label htmlFor="price">Price...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalesForm;
