import Order from '../models/Order.js';


export const getorders = async (req, res) => {
    const userId = req.user.id;
    const orders = await Order.find({ customer_id: userId });

    res.status(200).json(orders);
}


export const placeOrder = async (req, res) => {
    try {
        const { product_details } = req.body;
        const newOrder = new Order({
            customer_id: req.user.id,
            product_details,
            status: 'Placed',
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

export const partnergetorders = async (req, res) => {
    try {
        const orders = await Order.find({
            deliveryPartnerId: { $exists: false },
            status: 'Placed'
        });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

export const assignOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const partnerId = req.user.id;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if order is already assigned
        if (order.deliveryPartnerId) {
            return res.status(400).json({
                message: 'Order is already assigned to another delivery partner',
                assignedPartnerId: order.deliveryPartnerId
            });
        }

        // Check if order is in correct status
        if (order.status !== 'Placed') {
            return res.status(400).json({
                message: `Cannot assign order in ${order.status} status. Order must be in 'Placed' status.`
            });
        }

        // Update order with partner assignment
        order.deliveryPartnerId = partnerId;
        order.status = 'Accepted';
        await order.save();

        res.status(200).json({
            message: 'Order assigned successfully',
            order: {
                _id: order._id,
                status: order.status,
                deliveryPartnerId: order.deliveryPartnerId,
                product_details: order.product_details,
                created_at: order.created_at
            }
        });
    } catch (err) {
        console.error('Error in assignOrder:', err);
        res.status(500).json({
            message: 'Error assigning order',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

export const getPartnerAssignedOrders = async (req, res) => {
    try {
        const partnerId = req.user.id;

        const orders = await Order.find({
            deliveryPartnerId: partnerId,
            // status: { $in: ['Accepted', 'Out for Delivery'] }  // Only show active orders
        }).sort({ created_at: -1 });  // Sort by newest first

        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching partner assigned orders:', err);
        res.status(500).json({ message: 'Error fetching assigned orders' });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const partnerId = req.user.id;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.deliveryPartnerId.toString() !== partnerId) {
            return res.status(403).json({ message: 'Not authorized to update this order' });
        }

        // Validate status transition
        const validTransitions = {
            'Accepted': ['Out for Delivery'],
            'Out for Delivery': ['Delivered']
        };

        if (!validTransitions[order.status]?.includes(status)) {
            return res.status(400).json({
                message: `Cannot change status from ${order.status} to ${status}`
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: 'Order status updated successfully',
            order
        });
    } catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ message: 'Error updating order status' });
    }
};



