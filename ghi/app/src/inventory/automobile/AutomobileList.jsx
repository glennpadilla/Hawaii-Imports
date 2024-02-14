import { useState, useEffect } from 'react';

function AutomobileInventory() {
    const [autos, setAutos] = useState([]);
    const [vinsSales, setVinsSales] = useState([]);
    const [vinsApptmts, setVinsApptmts] = useState([]);

    const loadSales = async () => {
        const saleUrl = await fetch('http://localhost:8090/api/sales/');
        const saleData = await saleUrl.json();
        const vins = saleData.sales.map(sale => sale.automobile.vin);
        setVinsSales(vins);
    };

    const loadApptmts = async () => {
        const appointmentUrl = await fetch('http://localhost:8080/api/appointments/');
        const appointmentData = await appointmentUrl.json();
        const vins = appointmentData.appointments.map(appointment => appointment.vin.toUpperCase());
        setVinsApptmts(vins);
    };

    const loadAuto = async () => {
        const autoUrl = await fetch('http://localhost:8100/api/automobiles/');
        const autoData = await autoUrl.json();
        setAutos(autoData.autos);
    };

    useEffect(() => {
        loadSales();
        loadApptmts();
        loadAuto();
    }, []);

    function isSoldApptmts(automobile) {
        return vinsApptmts.includes(automobile.vin.toUpperCase())
    };

    function isSoldSales(automobile) {
        return vinsSales.includes(automobile.vin.toUpperCase())
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Automobiles</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Manufacturer</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>Year</th>
                                <th>Vin</th>
                                <th>Sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {autos?.map(automobile => {
                                return (
                                    <tr key={automobile.id}>
                                        <td>{automobile.model.manufacturer.name}</td>
                                        <td>{automobile.model.name}</td>
                                        <td>{automobile.color}</td>
                                        <td>{automobile.year}</td>
                                        <td>{automobile.vin.toUpperCase()}</td>
                                        <td>{isSoldApptmts(automobile)||isSoldSales(automobile)? "Yes" : "No"}</td>
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

export default AutomobileInventory;
