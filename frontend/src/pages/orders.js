import React, { useState, useEffect } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

const OrderPage = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
        { id: 4, name: 'Product 4', price: 40 },
        { id: 5, name: 'Product 5', price: 50 },
        { id: 6, name: 'Product 6', price: 60 },
        { id: 7, name: 'Product 7', price: 70 },
        { id: 8, name: 'Product 8', price: 80 },
        { id: 9, name: 'Product 9', price: 90 },
        { id: 10, name: 'Product 10', price: 100 },
    ]); 
    const [orderStatus, setOrderStatus] = useState('');
    // Order status to be updated via socket
    const [loading, setLoading] = useState(false);
    // Loading state for order placement
    const [selectedProducts, setSelectedProducts] = useState([]);
    // State to track selected products

    const toggleProductSelection = (product) => {
        setSelectedProducts(prevSelected => {
            const isSelected = prevSelected.some(p => p.id === product.id);
            if (isSelected) {
                return prevSelected.filter(p => p.id !== product.id);
            } else {
                return [...prevSelected, product];
            }
        });
    };

    const placeOrder = async () => {
        if (selectedProducts.length === 0) {
            alert('Please select at least one product to place an order.');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/orders', {
                product_details: selectedProducts,
            });
            console.log('Order placed successfully:', response.data);
            alert('Order placed successfully!');
            setSelectedProducts([]);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order.');
        } finally {
            setLoading(false);
        }
    };


    // useEffect(() => {
    //     const socket = io('http://yourdomain.com');  // Connect to the WebSocket server
    //     socket.on('order-updated', (status) => {
    //         setOrderStatus(status);  // Update the order status when received
    //     });

    //     return () => {
    //         socket.disconnect();  // Cleanup on component unmount
    //     };
    // }, []);

    return (
        <div className="order-page">
            <h1>Place Your Order</h1>

            {/* Product Selection (example for illustration) */}
            <div>
                <h3>Products:</h3>
                <ul>
                    {products.length === 0 ? (
                        <li>No products available</li>
                    ) : (
                        products.map((product) => (
                            <li key={product.id} onClick={() => toggleProductSelection(product)} style={{ cursor: 'pointer' }}>
                                {product.name} - ${product.price} {selectedProducts.some(p => p.id === product.id) ? '(Selected)' : ''}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Order Status Display */}
            <div>
                <h3>Order Status:</h3>
                <p>{orderStatus || 'socket.io ,here i show relatime order status'}</p>
            </div>

            {/* Place Order Button */}
            <div>
                <button onClick={placeOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default OrderPage;
