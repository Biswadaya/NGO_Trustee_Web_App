
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heart, CreditCard, Smartphone, Building2, Shield, CheckCircle, Copy, Mail, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { campaignAPI, donationAPI } from '@/api/endpoints';
import { useRazorpay } from 'react-razorpay';
import { useAuth } from '@/contexts/AuthContext';

import odishaSunrise from '@/assets/odisha-sunrise.jpg';
import campaignEducationImage from '@/assets/campaign-education.jpg'; // Fallbacks/Placeholders

const donationAmounts = [500, 1000, 2500, 5000, 10000];

const impactExamples = [
  { amount: 500, impactKey: 'donate.impact1' },
  { amount: 1000, impactKey: 'donate.impact2' },
  { amount: 2500, impactKey: 'donate.impact3' },
  { amount: 5000, impactKey: 'donate.impact4' },
  { amount: 10000, impactKey: 'donate.impact5' },
];

const bankDetails = {
  bankName: 'State Bank of India',
  accountName: 'NHRD - National Human Resource Development',
  accountNumber: '3XXXXXXXXXX567',
  ifscCode: 'SBIN0001234',
  branch: 'Bhubaneswar Main Branch',
  upiId: 'nhrd@sbi',
};

const Donate = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const campaignIdFromUrl = searchParams.get('campaign');
  const donationTypeFromUrl = searchParams.get('type');
  const isCSR = donationTypeFromUrl === 'CSR';
  const { user, isAuthenticated } = useAuth();

  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [donationTarget, setDonationTarget] = useState<'general' | 'campaign'>('general');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(campaignIdFromUrl);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  // Form State for User Details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Prefill user details & Validate Session
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.fullname || '');
      setEmail(user.email || '');

      // Optional: Verify if the user session is actually valid by making a lightweight protected call
      // If valid, good. If not, the axios interceptor (in endpoints.ts) should catch 401 and log out.
      // But for now, we rely on the fact that if they are "authenticated" in context, we try to use it.
    }
  }, [isAuthenticated, user]);

  // Fetch Campaigns
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await campaignAPI.list();
        setCampaigns(res?.data?.data?.campaigns || []);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      } finally {
        setLoadingCampaigns(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (campaignIdFromUrl) {
      setDonationTarget('campaign');
      setSelectedCampaign(campaignIdFromUrl);
    }
  }, [campaignIdFromUrl]);

  const currentAmount = customAmount ? parseInt(customAmount) : selectedAmount;
  const currentImpact = impactExamples.find(e => e.amount <= (currentAmount || 0));

  const allocationData = [
    { labelKey: 'donate.allocation.education', percentage: 40, color: 'bg-secondary' },
    { labelKey: 'donate.allocation.health', percentage: 20, color: 'bg-primary' },
    { labelKey: 'donate.allocation.women', percentage: 15, color: 'bg-accent' },
    { labelKey: 'donate.allocation.disaster', percentage: 15, color: 'bg-destructive' },
    { labelKey: 'donate.allocation.admin', percentage: 10, color: 'bg-muted-foreground' },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  // Phone state
  const [phone, setPhone] = useState('');
  // Razorpay
  const { Razorpay } = useRazorpay();

  const handleDonate = async () => {
    const finalAmount = currentAmount || 0;
    if (finalAmount <= 0) {
      toast.error("Please select a valid donation amount");
      return;
    }

    if (!isAuthenticated && (!name || !email || !phone)) {
      toast.error("Please provide your name, email and phone number");
      return;
    }

    try {
      setLoadingCampaigns(true); // Re-using loading state for payment processing

      // 1. Create Order
      const orderRes = await donationAPI.createOrder(finalAmount);
      const { id: order_id, currency } = orderRes.data.data;

      // 2. Open Razorpay
      const options = {
        key: import.meta.env.VITE_TEST_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: finalAmount * 100,
        currency: currency,
        name: "NHRD",
        description: selectedCampaign
          ? `Donation for ${campaigns.find(c => c.id === selectedCampaign)?.title}`
          : "General Donation",
        image: "https://your-logo-url.com/logo.png", // Replace with actual logo URL if available
        order_id: order_id,
        handler: async (response: any) => {
          try {
            // 3. Verify Payment
            const verifyRes = await donationAPI.verifyPayment({
              ...response,
              donation_data: {
                amount: finalAmount,
                currency: currency,
                payment_method: 'razorpay',
                campaign_id: selectedCampaign || null,
                user_id: user?.id || null,
                donor_name: name,
                donor_email: email,
                donor_phone: phone, // Pass the phone number
                is_anonymous: false
              }
            });

            if (verifyRes.data.status === 'success') {
              toast.success(`Thank you for your donation of ₹${finalAmount}!`);
              setCustomAmount('');
              setSelectedAmount(1000);
              // Optional: Redirect to success page or show success modal
            }
          } catch (err) {
            console.error("Payment Verification Failed", err);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone || '' // fallback to empty string
        },
        theme: {
          color: "#F37254"
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        toast.error(response.error.description || "Payment Failed");
      });
      rzp1.open();

    } catch (err) {
      console.error("Donation initialization failed", err);
      toast.error("Failed to initialize donation. Please try again.");
    } finally {
      setLoadingCampaigns(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={odishaSunrise}
            alt="Sunrise over Odisha"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/70 to-accent/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-accent-foreground"
          >
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {isCSR
                ? t('donate.csrHeroTitle', 'Your CSR Contribution changes lives')
                : (donationTypeFromUrl === 'GRANT'
                  ? t('donate.grantHeroTitle', 'Your Grant empowers communities')
                  : (donationTypeFromUrl === 'INVESTMENT'
                    ? t('donate.investmentHeroTitle', 'Invest in sustainable change')
                    : t('donate.heroTitle', 'Your Donation Changes Lives')
                  )
                )
              }
            </h1>
            <p className="text-xl md:text-2xl text-accent-foreground/90 max-w-3xl mx-auto">
              {isCSR
                ? 'Partner with us to create sustainable impact.'
                : (donationTypeFromUrl === 'GRANT'
                  ? 'Support specific projects through dedicated grants.'
                  : (donationTypeFromUrl === 'INVESTMENT'
                    ? 'Create social return on investment with us.'
                    : t('donate.heroSubtitle', 'Every contribution, no matter the size, helps us continue our mission.')
                  )
                )
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-card p-6 md:p-8 rounded-2xl shadow-xl"
            >
              {/* User Context */}
              {isAuthenticated ? (
                <div className="mb-6 p-4 bg-primary/5 rounded-xl flex items-center gap-3 border border-primary/10">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Welcome back, {user?.fullname}</p>
                    <p className="text-xs text-muted-foreground">Your donation will be linked to your account for tax certificates.</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t('donate.yourDetails', 'Your Details')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12"
                    />
                    <Input
                      placeholder="Email Address"
                      type="email"
                      value={email}
                      className="h-12"
                    />
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-1">
                    * Provide email to receive donation receipt.
                    <a href="/login" className="text-primary hover:underline ml-1">Login</a> for automatic tax certificates.
                  </p>
                </div>
              )}

              {/* Donation Target Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t('donate.donateToward', 'I want to donate toward')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setDonationTarget('general');
                      setSelectedCampaign(null);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${donationTarget === 'general'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                      }`}
                  >
                    <Building2 className={`w-6 h-6 mb-2 ${donationTarget === 'general' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <p className="font-semibold text-foreground">{t('donate.generalFund', 'General Fund')}</p>
                    <p className="text-sm text-muted-foreground">{t('donate.generalFundDesc', 'Support NHRD operations')}</p>
                  </button>
                  <button
                    onClick={() => setDonationTarget('campaign')}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${donationTarget === 'campaign'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                      }`}
                  >
                    <Heart className={`w-6 h-6 mb-2 ${donationTarget === 'campaign' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <p className="font-semibold text-foreground">{t('donate.specificCampaign', 'Specific Campaign')}</p>
                    <p className="text-sm text-muted-foreground">{t('donate.specificCampaignDesc', 'Choose a cause to support')}</p>
                  </button>
                </div>
              </div>

              {/* Campaign Selection */}
              <AnimatePresence>
                {donationTarget === 'campaign' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 overflow-hidden"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {t('donate.selectCampaign', 'Select a Campaign')}
                    </h3>
                    {loadingCampaigns ? (
                      <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {campaigns.map((campaign) => (
                          <button
                            key={campaign.id}
                            onClick={() => setSelectedCampaign(campaign.id)}
                            className={`relative rounded-xl overflow-hidden aspect-square transition-all ${selectedCampaign === campaign.id
                              ? 'ring-2 ring-primary ring-offset-2'
                              : 'hover:opacity-80'
                              }`}
                          >
                            <img
                              src={campaign.banner_image || campaignEducationImage}
                              alt={campaign.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = campaignEducationImage; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                              <p className="text-white text-xs font-medium leading-tight line-clamp-2 text-left">{campaign.title}</p>
                            </div>
                            {selectedCampaign === campaign.id && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Donation Type Toggle */}
              <div className="flex bg-muted rounded-lg p-1 mb-8">
                <button
                  onClick={() => setDonationType('one-time')}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${donationType === 'one-time'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground'
                    }`}
                >
                  {t('donate.oneTime', 'One-time Donation')}
                </button>
                <button
                  onClick={() => setDonationType('monthly')}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${donationType === 'monthly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground'
                    }`}
                >
                  {t('donate.monthly', 'Monthly Donation')}
                </button>
              </div>

              {/* Amount Selection */}
              <h3 className="text-lg font-semibold text-foreground mb-4">{t('donate.selectAmount', 'Select Amount')}</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-4 px-4 rounded-xl text-center font-semibold transition-all ${selectedAmount === amount && !customAmount
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  {t('donate.customAmount', 'Or Enter Custom Amount')}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder={t('donate.enterAmount', 'Enter amount')}
                    className="h-12 pl-8"
                  />
                </div>
              </div>

              {/* Impact Preview */}
              {currentAmount && currentAmount >= 500 && currentImpact && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/5 rounded-xl p-4 mb-6"
                >
                  <p className="text-sm text-muted-foreground">{t('donate.yourDonation', 'Your donation helps us provide:')}</p>
                  <p className="text-lg font-semibold text-primary">
                    {t(currentImpact.impactKey, 'Impact description placeholder')}
                  </p>
                </motion.div>
              )}

              {/* Payment Methods */}
              <h3 className="text-lg font-semibold text-foreground mb-4">{t('donate.paymentMethod', 'Payment Method')}</h3>
              <div className="space-y-3 mb-8">
                {[
                  { icon: CreditCard, labelKey: 'donate.card', label: 'Credit / Debit Card' },
                  { icon: Smartphone, labelKey: 'donate.upi', label: 'UPI / Wallet' },
                  { icon: Building2, labelKey: 'donate.netBanking', label: 'Net Banking' },
                ].map((method) => (
                  <label
                    key={method.labelKey}
                    className="flex items-center gap-4 p-4 bg-muted rounded-xl cursor-pointer hover:bg-muted/80 transition-colors"
                  >
                    <input type="radio" name="payment" className="w-4 h-4 text-primary" defaultChecked={method.labelKey.includes('card')} />
                    <method.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{t(method.labelKey, method.label)}</span>
                  </label>
                ))}
              </div>

              <Button variant="cta" size="xl" className="w-full gap-2" onClick={handleDonate}>
                <Heart className="w-5 h-5" />
                {t('donate.completeDonation', 'Complete Donation')} - ₹{(currentAmount || 0).toLocaleString()}
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-6 text-muted-foreground text-sm">
                <Shield className="w-4 h-4" />
                <span>{t('donate.securePayment', 'Secure Payment')}</span>
                <span>•</span>
                <span>{t('donate.taxDeductible', 'Tax Deductible')}</span>
              </div>
            </motion.div>

            {/* Right Column - Bank Details & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Bank Details Card */}
              <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {t('donate.bankTransfer', 'Bank Transfer Details')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('donate.bankTransferDesc', 'Prefer direct bank transfer? Use these details:')}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Bank</span>
                    <span className="text-sm font-medium text-foreground">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Account Name</span>
                    <span className="text-sm font-medium text-foreground text-right max-w-[180px]">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Account No.</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-medium text-foreground">{bankDetails.accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">IFSC Code</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-medium text-foreground">{bankDetails.ifscCode}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.ifscCode, 'IFSC code')}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">UPI ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-medium text-foreground">{bankDetails.upiId}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.upiId, 'UPI ID')}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {t('donate.bankTransferNote', 'After transfer, please email your payment details to contact@nhrd.org for receipt and tax certificate.')}
                  </p>
                </div>
              </div>

              {/* Where Money Goes */}
              <div className="bg-card p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {t('donate.whereMoneyGoes', 'Where Your Money Goes')}
                </h3>
                <div className="space-y-3">
                  {allocationData.map((item) => (
                    <div key={item.labelKey}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{t(item.labelKey, item.labelKey.split('.')[2]?.charAt(0).toUpperCase() + item.labelKey.split('.')[2]?.slice(1))}</span>
                        <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Benefits */}
              <div className="bg-primary/5 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  {t('donate.taxBenefits', 'Tax Benefits')}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('donate.taxBenefit1', 'Your donation is eligible for 50% tax exemption under Section 80G of Income Tax Act.')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t('donate.taxBenefit2', 'You will receive a digital 80G certificate instantly upon donation.')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
