"use client";
import GooglePayButtonComponent from '@/components/paiement/GooglePay';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from "react";
import Imagepaypal from '../../../public/images/paiements/logo-papal.png'
import representation from '../../../public/images/paiements/_6c4f9b74-c128-4110-b565-7aa71f19676f.jpeg'
import LogoApple from '../../../public/images/paiements/logo_apple_pay.png'
import LogoGoogle from '../../../public/images/paiements/_6c4f9b74-c128-4110-b565-7aa71f19676f.jpeg'
import { MOMO, googol,OM,Visa} from "../../app/services";
import { Link } from "react-feather";
import Image from "next/image";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  // paypalCreateOrder est la fonction qui appelle notre api backend qui est responsable de la création d'un ordre dans Paypal.
  const paypalCreateOrder = async () => {
    try {
      let response = await axios.post('/api/paypal/createorder', {
        user_id: store.getState().auth.user._id,
        order_price: amountRef.current.value
      })
      return response.data.data.order.order_id
    } catch (err) {
      // Your custom code to show an error like showing a toast:
      // toast.error('Some Error Occured')
      return null
    }
  }
  
  // paypalCaptureOrder est la fonction qui appellera notre backend api qui est responsable de la capture d'une commande, c'est-à-dire d'exécuter un ordre, dans Paypal.
  
  const paypalCaptureOrder = async orderID => {
    try {
      let response = await axios.post('/api/paypal/captureorder', {
        orderID
      })
      if (response.data.success) {
        // Order is successful
        // Your custom code

        // Like showing a success toast:
        // toast.success('Amount Added to Wallet')

        // And/Or Adding Balance to Redux Wallet
        // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
    } }catch (err) {
      // Order is not successful
      // Your custom code

      // Like showing an error toast
      // toast.error('Some Error Occured')
    }
  }


  return(
  <div className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 w-full">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center">
        <div className="w-1/2 flex flex-col justify-center items-center">
            <Image
              src={representation}
              alt="Illustration"
              className="max-h-full max-w-full w-80"
            />
          </div>
          <div className="w-1/2">
             <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
             <div className="space-y-4">
                 <div className="flex space-x-5 w-full">
                     <img
                    className={`rounded-md w-20 h-20${
                      paymentMethod === 'paypal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                    src={Visa}
                    alt="Illustration"
                    />
                   
                     <img
                    className={`rounded-md w-20 h-20${
                      paymentMethod === 'paypal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setPaymentMethod('APPLE')}
                    src={OM}
                    alt="Illustration"
                    />
                      <img
                    className={` rounded-md max-h-full max-w-full w-20 h-20 ${
                      paymentMethod === 'paypal' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => setPaymentMethod('GOOGLE')}
                    src={googol}
                    alt="Illustration"
                    />
                       <img
                    className={` rounded-md max-h-full max-w-full w-20 h-20 ${
                      paymentMethod === 'paypal' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => setPaymentMethod('MOMO_OM')}
                    src={MOMO}
                    alt="Illustration"
                    />
                    
                  {/* <Image
                    placeholder="blur"
                    quality={100}
                    fill
                    sizes="100vw"
                  style={{
                    objectFit: 'cover',
                  }}
                    className={`rounded-md ${
                      paymentMethod === 'credit_card' ? '' : ''
                    }`}
                    onClick={() => setPaymentMethod('credit_card')}
                    src={Imagepaypal.src}
                    alt="logo de visa"
                    // width={50}
                    height={50}
                    /> */}
                </div>
              {/* </div> */}
              {paymentMethod === 'credit_card' && (
                <>
                  <div>
                    <label htmlFor="card" className="block text-gray-700 font-bold mb-2">
                     Carte bancaire
                    </label>
                    <input
                      type="text"
                      id="card"
                      name="card"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      placeholder="Numero de la carte"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiry" className="block text-gray-700 font-bold mb-2">
                    Date d'Expiration 
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-gray-700 font-bold mb-2">
                      Code CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      placeholder="***"
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full">
                Valider
              </button>
                  </div>
                </>
              )}
              {paymentMethod === 'APPLE' && (
                <div>
                  <p className="text-gray-700">Payer via Apple Pay</p>
                </div>
              )}
              {paymentMethod === 'MOMO_OM' && (
                <div>
                  <p className="text-gray-700">Payer via OM ou MOMO</p>
                  <label className="block text-gray-700 text-sm font-bold mb-2 mt-5" htmlFor="">Veuillez saisir votre Numero de telephone</label>
                  <PhoneInput
                    placeholder="Email ou numéro de mobile"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    defaultCountry="FR" 
                    international={true} 
                    inputProps={{
                      className: 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500',
                    }}
                  />
                  <p>Numéro de téléphone : {phoneNumber}</p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full">
                Valider
              </button>
                </div>
              )}
              {paymentMethod === 'GOOGLE' && (
                <div>
                  <p className="text-gray-700">Payer via Google Pay</p>
                    <GooglePayButtonComponent/>
                  {/* <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full">
                Valider
              </button> */}
                </div>
              )}
               {paymentMethod === 'paypal' && (
                <div>
                  <p className="text-gray-700">Payer via Paypal</p>
                    <PayPalScriptProvider options={{ clientId: "test" }}>
                      <PayPalButtons style={{ layout: "horizontal" }} />
                    </PayPalScriptProvider>

   {/* <PayPalScriptProvider
            options={{
              'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
              currency: 'USD',
              intent: 'capture'
            }}
          >
            <PayPalButtons
              style={{
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                height: 50
              }}
              createOrder={async (data, actions) => {
                let order_id = await paypalCreateOrder()
                return order_id + ''
              }}
              onApprove={async (data, actions) => {
                let response = await paypalCaptureOrder(data.orderID)
                if (response) return true
              }}
            />
          </PayPalScriptProvider> */}
                 
                </div>
              )}
              
            </div>
          </div>

          </div>
          
        </div>
      </div>

  );
}
export default PaymentPage;
