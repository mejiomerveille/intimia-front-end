import  GooglePayButton  from '@google-pay/button-react';

const GooglePayButtonComponent = () => {
  return (
    <GooglePayButton
      environment="TEST" // Remplacez par "PRODUCTION" pour l'environnement de production
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY'],
              allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'YOUR_PAYMENT_GATEWAY', // Remplacez par votre passerelle de paiement
                gatewayMerchantId: 'YOUR_MERCHANT_ID', // Remplacez par votre ID de commerçant
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: 'YOUR_MERCHANT_ID', // Remplacez par votre ID de commerçant
          merchantName: 'Votre nom de commerçant',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: '10.00', // Remplacez par le montant du paiement
          currencyCode: 'USD', // Remplacez par la devise du paiement
        },
      }}
      onLoadPaymentData={(paymentData) => {
        // Traitez les données de paiement reçues
        console.log(paymentData);
      }}
    />
  );
};

export default GooglePayButtonComponent;