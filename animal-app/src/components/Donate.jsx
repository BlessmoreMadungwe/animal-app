import { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    if (!amount || Number(amount) <= 0) {
      return alert("Please enter a valid amount");
    }

    // Replace YOUR_MERCHANT_ID with your actual Paynow merchant ID
    const url = `https://www.paynow.co.zw/pay?merchant_id=YOUR_MERCHANT_ID&amount=${amount}`;
    window.open(url, "_blank"); // opens payment page in new tab
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        💖 Support Us
      </h2>

      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-md">
        Your donation helps us protect animals and maintain our wildlife sanctuary.
        Thank you for your support!
      </p>

      <input
        type="number"
        placeholder="Enter amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-2 rounded border mb-4 w-60 text-gray-900 dark:text-gray-900"
      />

      <button
        onClick={handleDonate}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
      >
        Donate via EcoCash
      </button>
    </div>
  );
}
