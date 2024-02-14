import React, { useState, useEffect } from 'react';

function SalespersonForm() {
    const initialFormData = {
        first_name: '',
        last_name: '',
        employee_id: '',
    }
    const [formData, setFormData] = useState(initialFormData);
    const [salespeople, setSalespeople] = useState([]);
    const [feedback, setFeedback] = useState('');

    const loadSalespeople = async () => {
        const salespeopleData = await fetch('http://localhost:8090/api/salespeople/');
        if (salespeopleData.ok) {
            const data = await salespeopleData.json();
            setSalespeople(data.salespeople);
        }
    };

    useEffect(() => {
        loadSalespeople();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try {
            const salespersonData = await fetch(salespeopleUrl, fetchConfig);
            if (!salespersonData.ok) {
                const errorData = await salespersonData.json();
                throw new Error(errorData.message);
            }
            setFormData(initialFormData);
            const salesperson = await salespersonData.json();
            setFeedback(`Salesperson ${salesperson.first_name} ${salesperson.last_name} created successfully!`);
        } catch (error) {
            setFeedback(error.message || 'Network error, please try again.');
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
                    <h1>Create a Salesperson</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.first_name}
                                onChange={handleFormChange}
                                placeholder="Enter salesperson's first name"
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
                                placeholder="Enter salesperson's last name"
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
                                value={formData.employee_id}
                                onChange={handleFormChange}
                                placeholder="Enter salesperson's employee ID"
                                required
                                type="text"
                                name="employee_id"
                                id="employee_id"
                                className="form-control"
                            />
                            <label htmlFor="employee_id">Employee ID...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalespersonForm;
