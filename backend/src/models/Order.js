import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
}, { _id: false });



const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_details: { type: [productSchema] },
    status: { type: String, enum: ['Placed', "Accepted", "Out for Delivery", 'Delivered'], default: 'Placed' },
    deliveryPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


const Order = mongoose.model('Order', orderSchema);


export default Order;