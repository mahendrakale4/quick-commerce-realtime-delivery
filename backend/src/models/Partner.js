import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define partner schema
const partnerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving to the database
partnerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
partnerSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
