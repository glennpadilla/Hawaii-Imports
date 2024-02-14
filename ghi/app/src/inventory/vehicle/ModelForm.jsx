import React, { useEffect, useState } from 'react';

function CreateVehicleModel() {
    const initialFormData = {
        name: '',
        picture_url: '',
        manufacturer_id: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [manufacturers, setManufacturers] = useState([]);
    const [feedback, setFeedback] = useState('');

    const loadManufacturer = async () => {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const manufacturerData = await fetch(manufacturerUrl);
        if (manufacturerData.ok) {
            const data = await manufacturerData.json();
            setManufacturers(data.manufacturers)
        }
    };

    useEffect(() => {
        loadManufacturer();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const modelUrl = 'http://localhost:8100/api/models/';

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const modelData = await fetch(modelUrl, fetchOptions);
            if (!modelData.ok) {
                const errorData = await modelData.json();
                throw new Error(errorData.message);
            }
            setFormData(initialFormData);
            const model = await modelData.json();
            setFeedback(`${model.name} created successfully!`);
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
                    <h1>Create a Vehicle Model</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Model name"
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                required
                            />
                            <label htmlFor="name">Model name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.picture_url}
                                onChange={handleFormChange}
                                placeholder="Picture URL"
                                type="url"
                                name="picture_url"
                                id="picture_url"
                                className="form-control"
                                required
                            />
                            <label htmlFor="picture_url">Picture URL...</label>
                        </div>
                        <div className="mb-3">
                            <select
                                value={formData.manufacturer_id}
                                onChange={handleFormChange}
                                name="manufacturer_id"
                                id="manufacturer"
                                className="form-select"
                                required
                            >
                                <option value="">Choose a manufacturer...</option>
                                {manufacturers?.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateVehicleModel;
