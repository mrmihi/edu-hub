import { traced } from '@sliit-foss/functions';
import { createPaymentIntent, retrievePaymentIntent, transferPayment } from '../../../../services';

export const serviceInitializePayment = (payment) => {
  return traced(createPaymentIntent)({
    amount: Number((payment.amount * 100).toFixed(0)),
    currency: 'lkr',
    description: `edu-hub Course Payment`,
    metadata: payment.metadata,
    shipping: {
      name: payment.customer.name,
      address: {
        line1: payment.customer.address ?? 'Mock Address',
        postal_code: '21030',
        city: 'Colombo',
        state: 'CA',
        country: 'LK',
      },
    },
  });
};

export const serviceRetrievePayment = (id) => {
  return traced(retrievePaymentIntent)(id);
};

export const serviceTransferPayment = async (id, { amount, destination_account_id: accountId }) => {
  const intent = await serviceRetrievePayment(id);
  const charge = intent.latest_charge;
  return traced(transferPayment)({
    amount: Number((amount * 100).toFixed(0)),
    currency: 'lkr',
    source_transaction: charge,
    destination: accountId,
  });
};
