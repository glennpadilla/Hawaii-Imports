import React, { useState, useEffect } from 'react';

function TechnicianForm() {
    const initialFormData = {
        first_name: '',
        last_name: '',
        employee_id: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [technician, setTechnician] = useState([]);
    const [feedback, setFeedback] = useState('');

    const loadTechnicians = async () => {
        try {
            const techniciansUrl = await fetch('http://localhost:8080/api/technicians/');
            if (!techniciansUrl.ok) throw new Error('Failed to fetch data.');
            const techniciansData = await techniciansUrl.json();
            setTechnician(techniciansData.technician);
        } catch (error) {
            console.error('Fetch error:', error)
        }
    };

    useEffect(() => {
        loadTechnicians();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try {
            const technicianData = await fetch(technicianUrl, fetchOptions);

            if (!technicianData.ok) {
                const errorData = await technicianData.json();
                throw new Error(errorData.message || 'Failed to submit the form. Please check your inpout');
            }

            setFormData(initialFormData);
            const technician = await technicianData.json();
            setFeedback(`Technician ${technician.first_name} ${technician.last_name} created successfully!`);
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
                    <h1>Create a New Technician</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.first_name}
                                onChange={handleFormChange}
                                placeholder="first name"
                                required
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="form-control"
                            />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.last_name}
                                onChange={handleFormChange}
                                placeholder="last name"
                                required
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="form-control"
                            />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.employee_id}
                                onChange={handleFormChange}
                                placeholder="employee id"
                                required
                                type="text"
                                name="employee_id"
                                id="employee_id"
                                className="form-control"
                            />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TechnicianForm;
