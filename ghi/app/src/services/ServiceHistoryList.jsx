import { useState, useEffect } from 'react';

function ServiceHistoryList() {
    const [appointments, setAppointments] = useState([]);
    const [vinArray, setVinArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [vinNotFound, setVinNotFound] = useState(false);
    const [error, setError] = useState('');

    const loadAppointments = async () => {
        try {
            const appointmentsUrl = await fetch('http://localhost:8080/api/appointments/');
            if (appointmentsUrl.ok) {
                const appointmentData = await appointmentsUrl.json();
                setAppointments(appointmentData.appointments);
            } else {
                throw new Error('Failed to fetch appointment');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const loadAutomobiles = async () => {
        try {
            const autoUrl = await fetch('http://localhost:8080/api/automobiles/');
            if (autoUrl.ok) {
                const autoData = await autoUrl.json();
                const vinData = autoData.autos.map(auto => auto.vin.toUpperCase());
                setVinArray(vinData);
            } else {
                throw new Error('Failed to fetch automobile');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadAppointments();
        loadAutomobiles();
    }, []);

    function isVIP(appointment) {
        return vinArray.includes(appointment.vin.toUpperCase());
    }

    function handleSearch() {
        const filteredAppointments = appointments.filter(appointment =>
            appointment.vin.toUpperCase() === searchTerm.toUpperCase()
        )
        if (filteredAppointments.length === 0) {
            setVinNotFound(true);
            setTimeout(() => {
                setVinNotFound(false);
            }, 1000);
        } else {
            setVinNotFound(false);
        }
        setSearchResults(filteredAppointments);
        setSearchTerm('');
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter' && e.target === document.activeElement) {
            handleSearch();
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Service History</h1>
                    <div className="input-group">
                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="search by vin"
                            aria-label
                            htmlFor="search"
                            aria-describedby="search-addon"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    {vinNotFound && (
                        <div className="alert alert-danger" role="alert">
                            VIN does not exist.
                        </div>
                    )}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Is VIP?</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Technician</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResults.length > 0 ? searchResults : appointments).map(appointment => (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin.toUpperCase()}</td>
                                    <td>{isVIP(appointment) ? 'Yes' : 'No'}</td>
                                    <td>{appointment.customer}</td>
                                    <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                    <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                    <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ServiceHistoryList;
