import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Partnerorders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getorders = async () => {
            try {
                const response = await api.get('/partnergetorders');
                console.log(response.data);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        getorders();
    }, []);

    const handleAssignOrder = async (orderId) => {
        try {
            await api.post(`/assignorder/${orderId}`);
            // Remove the assigned order from the list
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error assigning order:', error);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>Available Orders</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        <strong>Status:</strong> {order.status} - <strong>Order ID:</strong> {order._id}
                        <ul>
                            {order.product_details.map((product, index) => (
                                <li key={index}>
                                    {product.name} - ${product.price}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleAssignOrder(order._id)}
                            // style={{
                            //     padding: '8px 16px',
                            //     backgroundColor: '#4CAF50',
                            //     color: 'white',
                            //     border: 'none',
                            //     borderRadius: '4px',
                            //     cursor: 'pointer',
                            //     marginTop: '10px'
                            // }}
                        >
                            Assign to Me
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Partnerorders;
