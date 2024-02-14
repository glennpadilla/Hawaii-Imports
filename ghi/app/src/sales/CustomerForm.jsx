import React, { useState, useEffect } from 'react';

function CustomerForm() {
    const initialFormData = {
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
    }

    const [formData, setFormData] = useState(initialFormData);
    const [customers, setCustomers] = useState([])
    const [feedback, setFeedback] = useState('')

    const loadCustomers = async () => {
        const customersData = await fetch('http://localhost:8090/api/customers/');
        if (customersData.ok) {
            const data = await customersData.json();
            setCustomers(data.customers);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customersUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try {
            const customerData = await fetch(customersUrl, fetchConfig);
            if (!customerData.ok) {
                const errorData = await customerData.json();
                throw new Error(errorData.message);
            }

            setFormData(initialFormData);
            const customer = await customerData.json();
            setFeedback(`Customer ${customer.first_name} ${customer.last_name} created successfully!`);
        } catch (error) {
            setFeedback(error.message);
        }
    };

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
        });
        setFeedback('');
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Customer</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input
                            value={formData.first_name}
                            onChange={handleFormChange}
                            placeholder="Enter customer's first name"
                            required
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="form-control"
                        />
                            <label htmlFor="first_name">First name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.last_name}
                                onChange={handleFormChange}
                                placeholder="Enter customer's last name"
                                required
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="form-control"
                            />
                            <label htmlFor="last_name">Last name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.phone_number}
                                onChange={handleFormChange}
                                placeholder="Enter customer's phone number"
                                required
                                type="tel"
                                name="phone_number"
                                id="phone_number"
                                className="form-control"
                            />
                            <label htmlFor="phone_number">Phone number...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            value={formData.address}
                            onChange={handleFormChange}
                            placeholder="Enter customer's address"
                            required
                            type="text"
                            name="address"
                            id="address"
                            className="form-control"
                        />
                            <label htmlFor="address">Address...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;
