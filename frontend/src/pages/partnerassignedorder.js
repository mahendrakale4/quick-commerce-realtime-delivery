import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PartnerAssignedOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPartnerAssignedOrders = async () => {
            try {
                const response = await api.get('/getPartnerAssignedOrders');
                console.log('Assigned orders:', response.data);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching assigned orders:', error);
            } finally {
                setLoading(false);
            }
        };

        getPartnerAssignedOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/updateorderstatus/${orderId}`, { status: newStatus });
            // Update the order status in the local state
            setOrders(orders.map(order =>
                order._id === orderId
                    ? { ...order, status: newStatus }
                    : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>My Assigned Orders</h1>

            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        <div>
                            <strong>Order ID:</strong> {order._id}
                            <br />
                            <strong>Status:</strong> {order.status}
                            <br />
                            <strong>Products:</strong>
                            <ul>
                                {order.product_details.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - ${product.price}
                                    </li>
                                ))}
                            </ul>
                            <strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}
                        </div>

                        {/* Status Update Buttons */}
                        {order.status === 'Accepted' && (
                                <button onClick={() => handleUpdateStatus(order._id, 'Out for Delivery')}>
                                    Start Delivery
                                </button>
                            )}
                            {order.status === 'Out for Delivery' && (
                                <button onClick={() => handleUpdateStatus(order._id, 'Delivered')}>
                                    Mark as Delivered
                                </button>
                            )}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default PartnerAssignedOrders;
