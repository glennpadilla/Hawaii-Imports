import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="bg-dark text-center text-white">
                <div className="container p-4 pb-0">
                    <section className="mb-4">
                        CarCar is the premiere solution for automobile sales and services.
                    </section>
                </div>
                <div className="text-center p-3" style={{backgroundColor: 'rbga(0, 0, 0, 0.2)'}}>
                    Copyright &copy; CarCar 2024
                </div>
            </div>
        </footer>
    );
}

export default Footer;
