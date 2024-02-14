import { useState, useEffect } from 'react';

function ManufacturersList () {
    const [manufacturers, setManufacturers] = useState([]);
    const [error, setError] = useState('');

    const loadManufacturers = async () => {
        try {
            const manufacturerUrl = await fetch('http://localhost:8100/api/manufacturers/');
            if (manufacturerUrl.ok) {
                const manufacturerData = await manufacturerUrl.json();
                setManufacturers(manufacturerData.manufacturers);
            } else {
                throw new Error('Failed to load manufacturer.');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        loadManufacturers();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Manufacturers</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manufacturers?.map(manufacturer => {
                                return (
                                    <tr key={manufacturer.id}>
                                        <td>{manufacturer.name}</td>
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

export default ManufacturersList;
