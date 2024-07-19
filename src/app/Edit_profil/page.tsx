"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verify_otp } from '../services';

export default function VerifyOTP() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState(1);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="container mx-auto py-8 mt-24">
    <div className="flex justify-center">
        <div className="w-1/3 mr-4 border-r border-gray-300 pr-4">
                <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
                  <input type="hidden" name="cmd" value="_xclick" id="id_cmd"/>
                  <input type="hidden" name="charset" value="utf-8" id="id_charset"/>
                  <input type="hidden" name="currency_code" value="USD" id="id_currency_code"/>
                  <input type="hidden" name="no_shipping" value="1" id="id_no_shipping"/>
                  <input type="hidden" name="business" value="sb-3so3020154368@business.example.com" id="id_business"/>
                  <input type="hidden" name="amount" value="200" id="id_amount"/>
                  <input type="hidden" name="item_name" value="White Sneakers" id="id_item_name"/>
                  <input type="hidden" name="invoice" value="e7bc4692-d55c-4e59-ad56-6cf5f1a388e5" id="id_invoice"/>
                  <input type="hidden" name="notify_url" value="http://127.0.0.1:8080/" id="id_notify_url"/>
                  <input type="hidden" name="cancel_url" value="http://127.0.0.1:8080/payment-failed/1/" id="id_cancel_url"/>
                  <input type="image" src="https://www.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" name="submit" alt="Buy it Now"/>
                  <input type="hidden" name="return" value="http://127.0.0.1:8080/payment-success/1/" id="id_return"/>
                  </form>
        </div>

        
    </div>
</div>
  );
}