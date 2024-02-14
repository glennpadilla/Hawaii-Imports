import React, { useState } from 'react'

function CreateManufacturer() {
    const initialFormData = {
        name: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [manufacturerExists, setManufacturerExists] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const manufacturerData = await fetch(manufacturerUrl, fetchOptions);
            if (!manufacturerData.ok) {
                const errorData = await manufacturerData.json();
                throw new Error(errorData.message);
            }
            setFormData(initialFormData);
            setManufacturerExists(true);
            const manufacturer = await manufacturerData.json();
            setFeedback(`${manufacturer.name} created successfully!`);
        } catch (error) {
            setFeedback(error.message);
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name

        setFormData({
            ...formData,
            [inputName]: value
        })
        setManufacturerExists(false)
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Manufacturer</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Name"
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                required
                                />
                            <label htmlFor="name">Name...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateManufacturer;
