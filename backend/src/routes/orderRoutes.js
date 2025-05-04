import express from 'express';
import {
    getorders,
    placeOrder,
    partnergetorders,
    assignOrder,
    getPartnerAssignedOrders,
    updateOrderStatus
} from '../controllers/OrderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/orders', authMiddleware, placeOrder);
router.get('/getorders', authMiddleware, getorders);
router.get('/partnergetorders', authMiddleware, partnergetorders);
router.post('/assignorder/:orderId', authMiddleware, assignOrder);
router.get('/partnerassignedorders', authMiddleware, getPartnerAssignedOrders);
router.put('/updateorderstatus/:orderId', authMiddleware, updateOrderStatus);
router.get('/getPartnerAssignedOrders', authMiddleware, getPartnerAssignedOrders);


export default router;
