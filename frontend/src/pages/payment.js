import React, { useState, useEffect } from 'react';
import '../components/payment.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
const Payment = () => {
    const navigate = useNavigate();
    const [selectedTier, setSelectedTier] = useState('');
    const jwtToken = localStorage.getItem("jwtToken");

    const handleTierSelect = (tier) => {
        setSelectedTier(tier);
    };
    useEffect(() => {
        if (!jwtToken) {
            navigate("/login");
        }
    }, []);
    const plans = [
        { id: 1, title: '1 Post per Day', amount: '$3 per month' },
        { id: 2, title: '3 Posts per Day', amount: '$5 per month' },
        { id: 3, title: '5 Posts per Day', amount: '$10 per month' }
    ];
    function handlePayment(e) {
        console.log(e);
        setSelectedTier(e);
        localStorage.setItem('premiumMembership', selectedTier);
        alert(`Congratulations! You have purchased the premium membership.`);
        navigate('/myDetails');
    }
    return (
        <>
            <Navbar />
            <div className="payment-container">
                    <div className="payment-details">
                        <h4 style={{ color: "black" }}> Read and Post unlimited by taking premium subscription starting at $3/month</h4>
                    </div>
                    <div className='card-pay'>
                        {
                            plans.map((plan, index) => (
                                <div className="payment-card" key={index}>
                                    <h2 className="payment-card-title">{plan.title}</h2>
                                    <p className="payment-amount">{plan.amount}</p>
                                    <input type='radio' className="pay-button" onClick={() => handleTierSelect(plan.id)} />
                                </div>
                            ))
                        }

                    </div>
                    <button className='pay-button' onClick={handlePayment} style={{ marginTop: "10px" }}>Buy Now</button>
            </div>
        </>
    );
};

export default Payment;