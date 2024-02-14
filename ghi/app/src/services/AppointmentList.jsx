import { useState, useEffect } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [vinArray, setVinArray] = useState([]);
    const [cancel, setCancel] = useState(false);
    const [finish, setFinish] = useState(false);
    const [notCanceled, setNotCanceled] = useState(false);
    const [notFinished, setNotFinished] = useState(false);
    const [error, setError] = useState('');

    const loadAppointments = async () => {
        try {
            const appointmentsUrl = await fetch('http://localhost:8080/api/appointments/');
            if (appointmentsUrl.ok) {
                const appointmentsData = await appointmentsUrl.json();
                setAppointments(appointmentsData.appointments);
            } else {
                throw new Error('Failed to load appointments.')
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const loadAutomobiles = async () => {
        try {
            const automobilesUrl = await fetch('http://localhost:8100/api/automobiles/');
            if (automobilesUrl.ok) {
                const automobileData = await automobilesUrl.json();
                const autoVin = automobileData.autos.map(auto => auto.vin.toUpperCase());
                setVinArray(autoVin);
            } else {
                throw new Error('Failed to load automobiles.');
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
    };

    const handleFinish = async (id) => {
        const apptFinishUrl = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
            method: "PUT"
        });
        if (apptFinishUrl.ok) {
            setFinish(true);
            setTimeout(() => {
                setFinish(false);
            }, 1000);
            setAppointments(appointments.filter((appointments) => appointments.id !== id));
        } else {
            setNotFinished(true);
            setTimeout(() => {
                setNotFinished(false);
            }, 1000);
        }
    }

    const handleCancel = async (id) => {
        const apptCancelUrl = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
            method: "PUT"
        });
        if (apptCancelUrl.ok) {
            setCancel(true);
            setTimeout(() => {
                setCancel(false);
            }, 1000);
            setAppointments(appointments.filter((appointments) => appointments.id !== id));
        } else {
            setNotCanceled(true);
            setTimeout(() => {
                setNotCanceled(false);
            }, 1000);
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Service Appointments</h1>
                    {cancel && (
                        <div className="alert alert-success" role="alert">
                            Appointment has been canceled.
                        </div>
                    )}
                    {finish && (
                        <div className="alert alert-success" role="alert">
                            Appointment has been completed.
                        </div>
                    )}
                    {notCanceled && (
                        <div className="alert alert-warning" role="alert">
                            Appointment HAS NOT been canceled!
                        </div>
                    )}
                    {notFinished && (
                        <div className="alert alert-danger" role="alert">
                            Appointment IS NOT finished!
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
                            </tr>
                        </thead>
                        <tbody>
                            {appointments
                            .filter(appointment => appointment.status === "created")
                            .map(appointment => {
                                return (
                                    <tr key={appointment.id}>
                                        <td>{appointment.vin.toUpperCase()}</td>
                                        <td>{isVIP(appointment)? "Yes":"No"}</td>
                                        <td>{appointment.customer}</td>
                                        <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                        <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                        <td>{appointment.reason}</td>
                                        <td><button className="btn btn-danger" onClick={(e) => handleCancel(appointment.id)}>Cancel</button></td>
                                        <td><button className="btn btn-success" onClick={(e) => handleFinish(appointment.id)}>Finish</button></td>
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

export default AppointmentList;
