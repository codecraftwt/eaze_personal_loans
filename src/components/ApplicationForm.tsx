import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Loader2, Shield, Lock, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchSalesforceToken, sendMainApplicationData } from "@/store/api";
import { useSearchParams } from "react-router-dom";

interface ApplicationFormProps {
  onClose: () => void;
}

type FormStep = 1 | 2 | 3 | 4 | 5;

export interface FormData {
  businessAccountId: string;
  loanAmount: string;
  loanPurpose: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  driversLicense: string;
  driversLicenseState: string;
  zipCode: string;
  street: string;
  city: string;
  state: string;
  yearsAtAddress: string;
  residenceType: string;
  monthlyPayment: string;
  educationLevel: string;
  creditScore: string;
  employmentStatus: string;
  annualIncome: string;
  employerName: string;
  jobTitle: string;
  employmentStartDate: string;
  payFrequency: string;
  payrollType: string;
  consent: boolean;
}

export const initialFormData: FormData = {
  businessAccountId: '',
  loanAmount: "",
  loanPurpose: "Education",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  ssn: "",
  driversLicense: "",
  driversLicenseState: "",
  zipCode: "",
  street: "",
  city: "",
  state: "",
  yearsAtAddress: "",
  residenceType: "",
  monthlyPayment: "",
  educationLevel: "",
  creditScore: "",
  employmentStatus: "",
  annualIncome: "",
  employerName: "",
  jobTitle: "",
  employmentStartDate: "",
  payFrequency: "",
  payrollType: "",
  consent: false,
};

const loanAmounts = [
  // $5,000 to $25,000 in $500 increments
  "5000", "5500", "6000", "6500", "7000", "7500", "8000", "8500", "9000", "9500",
  "10000", "10500", "11000", "11500", "12000", "12500", "13000", "13500", "14000", "14500",
  "15000", "15500", "16000", "16500", "17000", "17500", "18000", "18500", "19000", "19500",
  "20000", "20500", "21000", "21500", "22000", "22500", "23000", "23500", "24000", "24500", "25000",
  // $25,000+ in $2,000 increments
  "27000", "29000", "31000", "33000", "35000", "37000", "39000", "41000", "43000", "45000",
  "47000", "49000", "51000", "53000", "55000", "57000", "59000", "61000", "63000", "65000",
  "67000", "69000", "71000", "73000", "75000", "77000", "79000", "81000", "83000", "85000",
  "87000", "89000", "91000", "93000", "95000", "97000", "99000", "100000"
];

const loanPurposes = [
  "Education", "Debt Consolidation", "Home Improvement", "Major Purchase",
  "Medical Expenses", "Business", "Vacation", "Wedding", "Other"
];

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const stepTitles = [
  { title: "Loan Details", subtitle: "How much do you need?" },
  { title: "Personal Info", subtitle: "Tell us about yourself" },
  { title: "Address", subtitle: "Where do you live?" },
  { title: "Education & Credit", subtitle: "A few more details" },
  { title: "Employment", subtitle: "Your work information" },
];

export const ApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSSN, setShowSSN] = useState(true);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();



  // --- REDUX HOOKS ---
  const dispatch = useAppDispatch();
  const { salesforceToken } = useAppSelector((state) => state.salesforce);
  const { toast: uiToast } = useToast();

  // 3. Optional: Auto-fetch token when component mounts if it's missing
  useEffect(() => {
    if (!salesforceToken) {
      dispatch(fetchSalesforceToken());
    }
  }, [dispatch, salesforceToken]);

  // Lock body scroll when modal is open (prevents background scrolling on mobile)
  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    // Store original styles
    const originalBodyOverflow = body.style.overflow;
    const originalBodyPosition = body.style.position;
    const originalBodyTop = body.style.top;
    const originalBodyWidth = body.style.width;
    const originalHtmlOverflow = html.style.overflow;

    // Apply scroll lock styles
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    html.style.overflow = 'hidden';

    return () => {
      // Restore original styles
      body.style.overflow = originalBodyOverflow;
      body.style.position = originalBodyPosition;
      body.style.top = originalBodyTop;
      body.style.width = originalBodyWidth;
      html.style.overflow = originalHtmlOverflow;

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Scroll both #root (mobile) and window
    const root = document.getElementById("root");
    if (root) root.scrollTo(0, 0);
    window.scrollTo(0, 0);


    // console.log(busCode2,'busCode2')
    // const busCode = searchParams.get('buss_code');
    let busCode: any =
      searchParams.get('buss-code') || // Matches your specific URL
      searchParams.get('bus-code') ||  // Matches common hyphen use
      searchParams.get('bus_code') ||
      searchParams.get('buss_code');
    console.log(busCode, 'busCode')

    if (busCode !== null && !formData.businessAccountId) {
      // debugger
      updateFormData('businessAccountId', busCode);
    }
    // else{
    //   busCode = localStorage.getItem('busCode')
    //   updateFormData('businessAccountId', busCode);
    // }
    // console.log(formData,'formData')
    // console.log(formData.businessAccountId,'formData.businessAccountId')
    // Show disclaimer if coming from Apply Now - always show on fresh navigation
    const fromApplyButton = searchParams.get('apply') === 'true';

    // if (fromApplyButton) {
    //   setShowDisclaimer(true);
    // }
  }, [searchParams, formData.businessAccountId, updateFormData]);



  const formatCurrency = (value: string) => {
    const num = parseInt(value);
    return num ? `$${num.toLocaleString()}` : value;
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const validateStep = (currentStep: FormStep): boolean => {
    // TEMP: All validation disabled for testing
    return true;
  };

  const nextStep = () => {
    if (validateStep(step) && step < 5) {
      setStep((step + 1) as FormStep);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as FormStep);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      return;
    }
    console.log(formData, 'formData')

    // Check if we have a token before proceeding
    if (!salesforceToken) {
      uiToast({
        title: "Authentication Error",
        description: "Salesforce token not found. Please wait or try again.",
        variant: "destructive",
      });
      dispatch(fetchSalesforceToken()); // Try to fetch it again
      return;
    }
    // setIsSubmitting(true);
    // await new Promise(resolve => setTimeout(resolve, 2000));

    // setIsSubmitting(false);
    // setIsSubmitted(true);

    try {
      // Dispatch the thunk with your formData
      // The thunk in api.ts will wrap this in { jsonbody: userData }
      const resultAction = await dispatch(sendMainApplicationData({
        accountId: formData.businessAccountId || "0015w00002PoGAnAAN",
        userData: { ...formData }
      }));

      if (sendMainApplicationData.fulfilled.match(resultAction)) {
        // Success logic
        setIsSubmitted(true);
      } else {
        // Error case: resultAction.payload contains the error message from rejectWithValue
        console.error("Submission failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderThankYou = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-3 sm:py-4 px-1 sm:px-2 space-y-4 sm:space-y-5"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-success/20 flex items-center justify-center">
        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-success" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg sm:text-2xl font-bold text-foreground">
          Thank You.
        </h2>
        <p className="text-muted-foreground text-xs sm:text-base px-2">
          We've successfully received your application.
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-3 sm:p-5 w-full">
        <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2 sm:mb-3">What happens next</h3>
        <div className="space-y-2 sm:space-y-2.5 text-left">
          {[
            { step: 1, title: "Application Review", desc: "Your information is now being reviewed." },
            { step: 2, title: "Pre-Approval Notification", desc: "You will receive a text message to book a call with EAZE." },
            { step: 3, title: "Offer Review", desc: "We will guide you through your available options." },
            { step: 4, title: "Approval", desc: "Once confirmed, your loan is approved." },
            { step: 5, title: "Funding", desc: "Funds are released to you." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start gap-2 sm:gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-foreground font-semibold text-[10px] sm:text-xs">{step}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground text-xs sm:text-sm leading-tight">{title}</p>
                <p className="text-muted-foreground text-[11px] sm:text-xs leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground italic px-2">
        Please stay close by your phone as our team will be in touch shortly.
      </p>

      <Button
        onClick={onClose}
        className="rounded-xl px-6 sm:px-8 py-2 sm:py-2.5 btn-primary min-h-[44px]"
      >
        Close
      </Button>
    </motion.div>
  );

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-8 px-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="flex items-center flex-1">
          <div className="relative flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${s === step
                ? 'bg-accent text-accent-foreground ring-4 ring-accent/20'
                : s < step
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground'
                }`}
            >
              {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
          </div>
          {s < 5 && (
            <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${s < step ? 'bg-success' : 'bg-muted'
              }`} />
          )}
        </div>
      ))}
    </div>
  );

  const inputClass = "input-enterprise";

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">
          How much funding do you need?
        </Label>
        <Select value={formData.loanAmount} onValueChange={(v) => updateFormData('loanAmount', v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select loan amount" />
          </SelectTrigger>
          <SelectContent>
            {loanAmounts.map(amount => (
              <SelectItem key={amount} value={amount}>{formatCurrency(amount)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">
          What is the purpose of the loan?
        </Label>
        <Select value={formData.loanPurpose} onValueChange={(v) => updateFormData('loanPurpose', v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            {loanPurposes.map(purpose => (
              <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-accent" />
          <div>
            <p className="text-sm font-semibold text-foreground">No Impact on Credit Score</p>
            <p className="text-xs text-muted-foreground">We use a soft pull that won't affect your credit.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">First Name</Label>
          <Input
            className={inputClass}
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            placeholder="John"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">Last Name</Label>
          <Input
            className={inputClass}
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Email Address</Label>
        <Input
          className={inputClass}
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="john.doe@example.com"
        />
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Cell Phone</Label>
        <Input
          className={inputClass}
          type="tel"
          value={formatPhoneNumber(formData.phone)}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
            updateFormData('phone', value);
          }}
          maxLength={14}
          placeholder="(555) 123-4567"
        />
        <p className="text-xs text-muted-foreground mt-1">Do not list a landline</p>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Date of Birth</Label>
        <Input
          className={inputClass}
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
        />
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">
          Social Security Number
          <span className="text-muted-foreground font-normal ml-2">(for soft pull only)</span>
        </Label>
        <div className="relative">
          <Input
            className={`${inputClass} pr-20`}
            type={showSSN ? "text" : "password"}
            value={formData.ssn}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 9);
              updateFormData('ssn', value);
              if (value.length === 9) {
                setShowSSN(false);
              }
            }}
            maxLength={9}
            placeholder="XXX-XX-XXXX"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
            <Lock className="w-4 h-4 text-muted-foreground pointer-events-none" />
            <button
              type="button"
              onClick={() => setShowSSN(!showSSN)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showSSN ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Shield className="w-3 h-3" />
          256-bit encryption • Won't affect your credit score
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">Driver's License #</Label>
          <Input
            className={inputClass}
            value={formData.driversLicense}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15).toUpperCase();
              updateFormData('driversLicense', value);
            }}
            maxLength={15}
            placeholder="License Number"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">Issued State</Label>
          <Select value={formData.driversLicenseState} onValueChange={(v) => updateFormData('driversLicenseState', v)}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Zip Code</Label>
        <Input
          className={inputClass}
          value={formData.zipCode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 5);
            updateFormData('zipCode', value);
          }}
          maxLength={5}
          placeholder="10001"
        />
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Street Address</Label>
        <Input
          className={inputClass}
          value={formData.street}
          onChange={(e) => updateFormData('street', e.target.value)}
          placeholder="123 Main St"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">City</Label>
          <Input
            className={inputClass}
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            placeholder="New York"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">State</Label>
          <Select value={formData.state} onValueChange={(v) => updateFormData('state', v)}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Years at This Address</Label>
        <Select value={formData.yearsAtAddress} onValueChange={(v) => updateFormData('yearsAtAddress', v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less-than-1">Less than 12 months</SelectItem>
            <SelectItem value="1-year">1 year</SelectItem>
            <SelectItem value="2-years">2 years</SelectItem>
            <SelectItem value="3-plus">3+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">Residence Type</Label>
          <Select value={formData.residenceType} onValueChange={(v) => updateFormData('residenceType', v)}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="own-outright">Own Outright</SelectItem>
              <SelectItem value="own-mortgage">Own with Mortgage</SelectItem>
              <SelectItem value="rent">I am Renting</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">Monthly Rent/Mortgage</Label>
          <Input
            className={inputClass}
            type="number"
            value={formData.monthlyPayment}
            onChange={(e) => updateFormData('monthlyPayment', e.target.value)}
            placeholder="1500"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Highest Education Level</Label>
        <Select value={formData.educationLevel} onValueChange={(v) => updateFormData('educationLevel', v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-school">High School</SelectItem>
            <SelectItem value="associate">Associate Degree</SelectItem>
            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
            <SelectItem value="masters">Master's Degree</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Estimate Your Credit Score</Label>
        <Select value={formData.creditScore} onValueChange={(v) => updateFormData('creditScore', v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent (720-850)</SelectItem>
            <SelectItem value="good">Good (680-719)</SelectItem>
            <SelectItem value="fair">Fair (640-679)</SelectItem>
            <SelectItem value="poor">Poor (0-639)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Employment Status</Label>
        <Select value={formData.employmentStatus} onValueChange={(v) => updateFormData('employmentStatus', v)}>
          <SelectTrigger className={inputClass}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="self-employed">Self-Employed</SelectItem>
            <SelectItem value="1099">1099 Contractor</SelectItem>
            <SelectItem value="retirement">Retirement</SelectItem>
            <SelectItem value="unemployed">Unemployed</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Yearly Pre-Tax Income</Label>
        <Input
          className={inputClass}
          type="number"
          value={formData.annualIncome}
          onChange={(e) => updateFormData('annualIncome', e.target.value)}
          placeholder="75000"
        />
        <p className="text-xs text-muted-foreground mt-1">Include bonuses, commissions, etc.</p>
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Employer Name</Label>
        <Input
          className={inputClass}
          value={formData.employerName}
          onChange={(e) => updateFormData('employerName', e.target.value)}
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Job Title</Label>
        <Input
          className={inputClass}
          value={formData.jobTitle}
          onChange={(e) => updateFormData('jobTitle', e.target.value)}
          placeholder="Software Engineer"
        />
      </div>

      <div>
        <Label className="text-sm font-semibold text-foreground mb-2 block">Employment Start Date</Label>
        <Input
          className={inputClass}
          type="date"
          value={formData.employmentStartDate}
          onChange={(e) => updateFormData('employmentStartDate', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">Payroll Frequency</Label>
          <Select value={formData.payFrequency} onValueChange={(v) => updateFormData('payFrequency', v)}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
              <SelectItem value="twice-monthly">Twice Monthly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold text-foreground mb-2 block">Payroll Type</Label>
          <Select value={formData.payrollType} onValueChange={(v) => updateFormData('payrollType', v)}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct-deposit">Direct Deposit</SelectItem>
              <SelectItem value="paper-check">Paper Check</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-5 rounded-xl border-2 border-border bg-muted/30">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => updateFormData('consent', checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
            I acknowledge and consent to the Fair Credit Reporting Act (FCRA) disclosure,
            privacy policy, and agree to receive automated communications regarding my
            application. I understand that a <strong>soft credit pull</strong> will be performed which
            will <strong>not affect my credit score</strong>.
          </label>
        </div>
      </div>
    </motion.div>
  );



  return (
    <div className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card w-full max-w-xl max-h-[95vh] rounded-2xl sm:rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                {isSubmitted ? "Next Steps" : stepTitles[step - 1].title}
              </h2>
              {!isSubmitted && (
                <p className="text-muted-foreground text-sm mt-1">
                  {stepTitles[step - 1].subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress - hide on thank you page */}
        {!isSubmitted && (
          <div className="px-4 sm:px-6 pt-4 sm:pt-6">
            {renderStepIndicator()}
          </div>
        )}

        {/* Form content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              renderThankYou()
            ) : (
              <>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - hide on thank you page */}
        {!isSubmitted && (
          <div className="p-4 sm:p-6 border-t border-border flex justify-between gap-3 sm:gap-4 bg-muted/30">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2 rounded-xl px-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 rounded-xl px-8 btn-primary"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.consent}
                className="flex items-center gap-2 rounded-xl px-8 bg-success hover:bg-success/90 text-success-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>Submit Application</>
                )}
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
