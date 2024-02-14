import React, { useEffect, useState } from 'react';

function CreateAutomobile() {
    const initialFormData = {
        color: '',
        year: '',
        vin: '',
        model_id: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [manufacturers, setManufacturers] = useState([]);
    const [models, setModels] = useState([]);
    const [vinExists, setVinExists] = useState(false);
    const [feedback, setFeedback] = useState('');

    const loadModels = async () => {
        try {
            const modelsUrl = await fetch('http://localhost:8100/api/models/');
            if (modelsUrl.ok) {
                const modelData = await modelsUrl.json();
                setModels(modelData.models);
            } else {
                throw new Error('Failed to fetch model.')
            }
        } catch (error) {
            console.error("Error fetching model:", error.message);
        }
    };

    const loadManufacturers = async () => {
        try {
            const manufacturersUrl = await fetch('http://localhost:8100/api/manufacturers/');
            if (manufacturersUrl.ok) {
                const manufacturerData = await manufacturersUrl.json();
                setManufacturers(manufacturerData.manufacturers);
            } else {
                throw new Error('Failed to fetch manufacturer.')
            }
        } catch (error) {
            console.error("Error fetching manufacturer:", error.message);
        }
    };

    useEffect(() => {
        loadModels();
        loadManufacturers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const autoUrl = 'http://localhost:8100/api/automobiles/';

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const autoData = await fetch(autoUrl, fetchOptions);
            if (!autoData.ok) {
                const errorData = await autoData.json();
                throw new Error(errorData.message);
            }
            setFormData(initialFormData);
            setVinExists(true)
            const selectedModel = models.find(model => String(model.id) === String(formData.model_id));
            const modelName = selectedModel ? selectedModel.name : 'Unknown model';
            setFeedback(`${formData.color} ${formData.year} ${modelName} created successfully!`);
        } catch (error) {
            setFeedback(error.message);
        }
    };

    const handleFormChange = (e) => {
        const value = e.target.name === 'vin' ? e.target.value.toUpperCase() : e.target.value
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
        setVinExists(false)
        setFeedback('');
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an Automobile</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.color}
                                onChange={handleFormChange}
                                placeholder="Color"
                                type="text"
                                name="color"
                                id="color"
                                className="form-control"
                                required
                            />
                            <label htmlFor="color">Color...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.year}
                                onChange={handleFormChange}
                                placeholder="Year"
                                type="number"
                                name="year"
                                id="year"
                                className="form-control"
                                required
                            />
                            <label htmlFor="year">Year...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.vin}
                                onChange={handleFormChange}
                                placeholder="Vin"
                                type="text"
                                name="vin"
                                id="vin"
                                className="form-control"
                                required
                            />
                            <label htmlFor="vin">Vin...</label>
                        </div>
                        <div className="mb-3">
                            <select
                                value={formData.model_id}
                                onChange={handleFormChange}
                                name="model_id"
                                id="model"
                                className="form-select"
                                required
                            >
                                <option value="">Choose a model...</option>
                                {models.map(model => {
                                    // const manufacturer = manufacturers.find(manu => manu.id === model.manufacturer_id);
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {/* {manufacturer ? `${manufacturer.name} - ${model.name}` : model.name} */}
                                            {model.manufacturer.name} {model.name}
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
    );
}

export default CreateAutomobile;
