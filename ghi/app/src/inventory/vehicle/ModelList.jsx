import { useState, useEffect } from 'react';

function VehicleModelList() {
    const [models, setModels] = useState([]);
    const [error, setError] = useState([]);

    const loadModel = async () => {
        try {
            const modelUrl = await fetch('http://localhost:8100/api/models/');
            if (modelUrl.ok) {
                const modelData = await modelUrl.json();
                setModels(modelData.models);
            } else {
                throw new Error('Failed to load model.')
            }
        } catch (error){
            setError(error.message);
        }
    };

    useEffect(() => {
        loadModel();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Models</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Manufacturer</th>
                                <th>Model</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models?.map(model => {
                                return (
                                    <tr key={model.id}>
                                        <td>{model.manufacturer.name}</td>
                                        <td>{model.name}</td>
                                        <td><img src={model.picture_url} width="300" /></td>
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

export default VehicleModelList;
