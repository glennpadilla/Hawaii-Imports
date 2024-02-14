import React, { useEffect, useState } from 'react';

function CreateAppointmentForm() {
    const initialFormData = {
        date_time: '',
        reason: '',
        vin: '',
        customer: '',
        technician: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [feedback, setFeedback] = useState('');

    const loadTechnicians = async () => {
        const techniciansUrl = 'http://localhost:8080/api/technicians/';
        const technicianData = await fetch(techniciansUrl);
        if (technicianData.ok) {
            const data = await technicianData.json();
            setTechnicians(data.technicians);
        }
    };

    useEffect(() => {
        loadTechnicians();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const initDateTime = new Date(date + 'T' + time);
        const utcYear = initDateTime.getUTCFullYear();
        const utcMonth = initDateTime.getUTCMonth() + 1;
        const utcDay = initDateTime.getUTCDate();
        const utcHours = initDateTime.getUTCHours();
        const utcMinutes = initDateTime.getUTCMinutes();
        const utcSeconds = initDateTime.getUTCSeconds();
        const dateTime = `${utcYear}-${String(utcMonth).padStart(2, '0')}-${String(utcDay).padStart(2, '0')}T${String(utcHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}Z`;

        const updatedFormData = {
            ...formData,
            date_time: dateTime
        };

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(updatedFormData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try {
            const appointmentData = await fetch(appointmentUrl, fetchOptions);

            if (!appointmentData.ok) {
                const errorData = await appointmentData.json();
                throw new Error(errorData.message);
            }

            setFormData(initialFormData);
            setDate('');
            setTime('');
            const appointment = await appointmentData.json();
            setFeedback(`Appointment created successfully for ${appointment.customer}.`);
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

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value);
    };

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setTime(value);
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Service Appointment</h1>
                    {feedback && <div className="alert alert-info">{feedback}</div>}
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.vin}
                                onChange={handleFormChange}
                                placeholder="automobile VIN"
                                required
                                type="text"
                                name="vin"
                                id="vin"
                                className="form-control"
                            />
                            <label htmlFor="vin">Automobile VIN...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.customer}
                                onChange={handleFormChange}
                                placeholder="customer name"
                                required
                                type="text"
                                name="customer"
                                id="customer"
                                className="form-control"
                            />
                            <label htmlFor="customer">Customer name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={date}
                                onChange={handleDateChange}
                                placeholder="Date"
                                required
                                type="date"
                                name="date"
                                id="date"
                                className="form-control"
                            />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={time}
                                onChange={handleTimeChange}
                                placeholder="Time"
                                required
                                type="time"
                                name="time"
                                id="time"
                                className="form-control"
                            />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="mb-3">
                            <select
                                value={formData.technician}
                                onChange={handleFormChange}
                                required
                                name="technician"
                                id="technician"
                                className="form-select"
                            >
                                <option value="">Choose a Technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.employee_id} value={technician.employee_id}>
                                            {technician.first_name} {technician.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={formData.reason}
                                onChange={handleFormChange}
                                placeholder="reason"
                                required
                                type="text"
                                name="reason"
                                id="reason"
                                className="form-control"
                            />
                            <label htmlFor="reason">Reason...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAppointmentForm;
