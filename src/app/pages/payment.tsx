import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, ChevronLeft, CreditCard, Wallet, AlertCircle, QrCode } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function PaymentPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'pending_payment' | 'processing' | 'confirmed' | 'failed'>('pending_payment');
  const { theme } = useTheme();
  const dark = theme === 'dark';
  
  const transactionAmount = 5.00;
  const bookingId = `BK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  const handlePayment = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('confirmed');
    }, 2000);
  };

  if (status === 'confirmed') {
    return (
      <div className={`min-h-screen ${dark ? 'bg-[#111827]' : 'bg-[#f9fafb]'} flex items-center justify-center p-6`}>
        <Card className={`max-w-md w-full border-none shadow-2xl overflow-hidden ${dark ? 'bg-[#1f2937]' : ''}`}>
          <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-white/90">Your booking is now confirmed.</p>
          </div>
          <CardContent className={`p-8 space-y-6 ${dark ? 'bg-[#1f2937]' : 'bg-white'}`}>
            <div className={`flex justify-between py-3 border-b ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
              <span className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>Amount Paid</span>
              <span className={`font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>${transactionAmount.toFixed(2)}</span>
            </div>
            <div className={`flex justify-between py-3 border-b ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
              <span className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>Status</span>
              <span className="font-bold text-[#10b981]">Confirmed</span>
            </div>
            <div className={`flex justify-between py-3 border-b ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
              <span className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>Booking ID</span>
              <span className={`font-mono text-sm ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{bookingId}</span>
            </div>
            
            {/* QR Code */}
            <div className="text-center pt-4">
              <h3 className={`font-semibold mb-3 ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>
                <QrCode className="w-5 h-5 inline mr-2" />
                Your Booking QR Code
              </h3>
              <div className={`w-48 h-48 mx-auto ${dark ? 'bg-white' : 'bg-white'} p-4 rounded-xl border-2 border-[#4f46e5] mb-3`}>
                <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-0.5">
                  {Array.from({ length: 100 }, (_, i) => (
                    <div key={i} className={`${
                      // Corner patterns
                      (i < 3 && (i % 10) < 3) || (i < 3 && (i % 10) > 6) || (i > 6 && i < 10 && (i % 10) < 3)
                        ? 'bg-[#1a1a2e]'
                        : (i + Math.floor(i / 10)) % 3 === 0 
                          ? 'bg-[#1a1a2e]' 
                          : i % 7 === 0 
                            ? 'bg-[#4f46e5]' 
                            : 'bg-white'
                    } rounded-[1px]`} />
                  ))}
                </div>
              </div>
              <p className={`text-sm font-mono ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                {bookingId}
              </p>
              <p className={`text-xs mt-1 ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                Show this QR code to the receptionist at check-in
              </p>
            </div>
            
            <Button className={`w-full h-12 ${dark ? 'bg-white text-[#1a1a2e] hover:bg-[#f3f4f6]' : 'bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90'}`} onClick={() => navigate('/student')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${dark ? 'bg-[#111827]' : 'bg-[#f9fafb]'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className={`flex items-center gap-2 ${dark ? 'text-[#9ca3af] hover:text-white' : 'text-[#6b7280] hover:text-[#1a1a2e]'} mb-8 transition-colors`}>
          <ChevronLeft className="w-5 h-5" /> Back to Booking
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-2`}>Checkout</h1>
            <p className={`${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mb-8`}>Select a payment method to confirm your reservation.</p>

            <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} shadow-sm mb-6`}>
              <CardHeader>
                <CardTitle className={dark ? 'text-white' : ''}>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className={`flex items-center gap-4 p-4 border-2 border-[#4f46e5] ${dark ? 'bg-[#4f46e5]/10' : 'bg-[#4f46e5]/5'} rounded-xl cursor-pointer`}>
                  <input type="radio" name="payment_method" className="text-[#4f46e5]" defaultChecked />
                  <CreditCard className="w-6 h-6 text-[#4f46e5]" />
                  <div>
                    <div className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Credit/Debit Card</div>
                    <div className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Visa, Mastercard, Amex</div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border-2 ${dark ? 'border-[#374151] hover:border-[#4f46e5]/50' : 'border-[#e5e7eb] hover:border-[#d1d5db]'} rounded-xl cursor-pointer`}>
                  <input type="radio" name="payment_method" className="text-[#4f46e5]" />
                  <Wallet className="w-6 h-6 text-[#6b7280]" />
                  <div>
                    <div className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Rewards Points</div>
                    <div className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Use 200 points</div>
                  </div>
                </label>
              </CardContent>
            </Card>

            <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} shadow-sm`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Card Number</label>
                    <input type="text" className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:border-[#4f46e5] ${dark ? 'bg-[#111827] border-[#374151] text-white' : 'border-[#e5e7eb]'}`} placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Expiry</label>
                      <input type="text" className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:border-[#4f46e5] ${dark ? 'bg-[#111827] border-[#374151] text-white' : 'border-[#e5e7eb]'}`} placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>CVC</label>
                      <input type="text" className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:border-[#4f46e5] ${dark ? 'bg-[#111827] border-[#374151] text-white' : 'border-[#e5e7eb]'}`} placeholder="123" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} shadow-xl sticky top-8`}>
              <CardHeader className="bg-[#1a1a2e] text-white rounded-t-xl">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className={`flex items-start justify-between mb-6 pb-6 border-b ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
                  <div>
                    <h4 className={`font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>Room Reservation</h4>
                    <p className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>1 Hour Session</p>
                    <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-[#ef4444]">
                      <AlertCircle className="w-3 h-3" />
                      Status: pending_payment
                    </div>
                  </div>
                  <div className={`font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>${transactionAmount.toFixed(2)}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className={`flex justify-between ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                    <span>Subtotal</span>
                    <span>${transactionAmount.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                    <span>Service Fee</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className={`flex justify-between items-center mb-8 pt-4 border-t ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
                  <span className={`text-lg font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Total</span>
                  <span className="text-2xl font-bold text-[#4f46e5]">${transactionAmount.toFixed(2)}</span>
                </div>

                <Button 
                  onClick={handlePayment} 
                  disabled={status === 'processing'}
                  className="w-full h-14 text-lg bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white shadow-lg hover:opacity-90 transition-opacity"
                >
                  {status === 'processing' ? 'Processing...' : `Pay $${transactionAmount.toFixed(2)}`}
                </Button>
                
                <p className={`text-center text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-4`}>
                  By confirming, you agree to our Terms of Service and Cancellation Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
