import React, { useEffect, useState } from 'react';
import api from '../services/api';

const GetOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getorders = async () => {
            try {
                const response = await api.get('/getorders');
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

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>Your Orders</h1>
            <ul>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <li key={order._id}>
                            <strong>Status:</strong> {order.status} -  <strong>order id:</strong> {order._id}
                            <ul>
                                {order.product_details.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - ${product.price}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))
                ) : (
                    <li>No orders found.</li>
                )}
            </ul>
        </div>
    );
};

export default GetOrders;
