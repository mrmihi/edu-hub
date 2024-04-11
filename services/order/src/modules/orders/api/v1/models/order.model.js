import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { orderStatuses } from '@app/constants';

const OrderSchema = new mongoose.Schema(
  {
    courses: [
      {
        _id: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: 'Course',
        },
        quantity: Number,
      },
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      enum: Object.values(orderStatuses),
      default: orderStatuses.confirmed,
    },
    payment_id: String,
    payment_transfer_id: String,
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

OrderSchema.index({ createdAt: 1 });

OrderSchema.plugin(aggregatePaginate);

const Order = mongoose.model('Order', OrderSchema);

Order.syncIndexes();

export { Order };
