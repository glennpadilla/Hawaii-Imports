import { useState, useEffect } from 'react';

function TechnicianList(props) {
    const [technicians, setTechnicians] = useState([]);
    const [error, setError] = useState('');

    const loadTechnicians = async () => {
        try {
            const techniciansUrl = await fetch('http://localhost:8080/api/technicians/');
            if (techniciansUrl.ok) {
                const technicainsData = await techniciansUrl.json();
                setTechnicians(technicainsData.technicians);
            } else {
                throw new Error('Failed to fetch technician');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadTechnicians();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Technicians</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {technicians.map(technician => {
                                return (
                                    <tr key={technician.id}>
                                        <td>{technician.employee_id}</td>
                                        <td>{technician.first_name}</td>
                                        <td>{technician.last_name}</td>
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

export default TechnicianList;
