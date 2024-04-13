import mongoose from 'mongoose';
import { roles } from '@app/constants';

export const getCollectionTotals = async () => {
  const db = mongoose.connection.db;
  const [buyers, sellers, orders, succeededPayments, failedPayments, reviews] = await Promise.all([
    db.collection('users').countDocuments({ role: roles.buyer }),
    db.collection('users').countDocuments({ role: roles.seller }),
    db.collection('orders').estimatedDocumentCount(),
    db.collection('orders').countDocuments({ status: 'paid' }),
    db.collection('orders').countDocuments({ status: 'confirmed', payment_id: { $exists: true } }),
    db.collection('reviews').estimatedDocumentCount(),
  ]);
  return {
    registrations: {
      buyers,
      sellers,
    },
    orders,
    payments: {
      succeeded: succeededPayments,
      failed: failedPayments,
    },
    reviews,
  };
};

export const getProfits = () => {
  const db = mongoose.connection.db;
  return db
    .collection('orders')
    .aggregate([
      {
        $unwind: '$products',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products._id',
          foreignField: '_id',
          as: 'products.data',
        },
      },
      {
        $unwind: '$products.data',
      },
      {
        $group: {
          _id: { $month: '$created_at' },
          profit: { $sum: { $round: [{ $multiply: [{ $subtract: ['$products.data.selling_price', '$products.data.markup_price'] }, '$products.quantity'] }, 2] } },
        },
      },
      {
        $addFields: {
          month_string: {
            $let: {
              vars: {
                monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              },
              in: {
                $arrayElemAt: ['$$monthsInString', '$_id'],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$month_string',
          profit: 1,
        },
      },
    ])
    .toArray();
};
