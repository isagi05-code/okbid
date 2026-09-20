import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { Input, Textarea } from '../../components/Input/Input';
import { Badge } from '../../components/Badge/Badge';
import { formatCurrency } from '../../utils/formatting';
import { validateProductSubmission } from '../../utils/validation';
import { predictRank, getMinimumIncrement } from '../../utils/ranking';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  QrCode,
  Copy,
  ShieldCheck,
  CheckCircle2,
  Trophy
} from 'lucide-react';

export function SubmitProduct() {
  const navigate = useNavigate();
  const { categories, products, submitProduct } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    tagline: '',
    category: categories[0]?.name || 'AI & Machine Learning',
    description: '',
    maker: '',
    pricing: 'Freemium',
    features: ['Instant setup', 'API available', 'High-speed sync'],
    brandColor: '#6366F1',
    bid: '500'
  });
  const [utrNumber, setUtrNumber] = useState('');
  const [qrCopied, setQrCopied] = useState(false);

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);

  const numericBid = Number(formData.bid) || 0;
  const projectedRank = predictRank(products, numericBid);
  const isTopRank = projectedRank === 1;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const validation = validateProductSubmission(formData, 200);
      const step1Errors = {};
      if (validation.errors.name) step1Errors.name = validation.errors.name;
      if (validation.errors.website) step1Errors.website = validation.errors.website;
      if (validation.errors.tagline) step1Errors.tagline = validation.errors.tagline;
      if (validation.errors.category) step1Errors.category = validation.errors.category;

      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
    }

    if (currentStep === 3) {
      if (numericBid < 200) {
        setErrors({ bid: 'Minimum initial stake is ₹200' });
        return;
      }
    }

    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handleCopyUPI = () => {
    if (navigator.clipboard) navigator.clipboard.writeText('okbid@upi');
    setQrCopied(true);
    setTimeout(() => setQrCopied(false), 2000);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleCompleteSubmission = () => {
    if (!utrNumber.trim()) {
      setErrors({ payment: 'Please enter the UTR / Transaction ID from your UPI payment.' });
      return;
    }
    setIsProcessing(true);
    setErrors({});

    // Brief verification simulation
    setTimeout(() => {
      const newProd = submitProduct(formData);
      setCreatedProduct(newProd);
      setCurrentStep(5);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '780px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <Badge variant="gold" size="sm" icon={Sparkles} style={{ marginBottom: '0.5rem' }}>
          New Listing
        </Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Stake Your Spot on OKBid
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
          Put your startup in front of thousands of high-intent tech buyers and investors.
        </p>
      </div>

      {/* Multi-step progress bar */}
      {currentStep < 5 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
          {/* Connecting Line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '2px',
              background: 'var(--border-subtle)',
              zIndex: 1,
              transform: 'translateY(-50%)'
            }}
          />

          {[
            { num: 1, label: 'Identity' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'Stake' },
            { num: 4, label: 'Review' }
          ].map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isCurrent
                      ? 'var(--color-gold)'
                      : isCompleted
                      ? 'var(--color-indigo)'
                      : 'var(--bg-surface-2)',
                    color: isCurrent ? '#000' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    border: '2px solid var(--bg-base)',
                    boxShadow: isCurrent ? '0 0 16px rgba(245, 158, 11, 0.5)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : s.num}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? 'var(--text-white)' : 'var(--text-dim)'
                  }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Step Form Container */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          background: 'var(--bg-surface-1)',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        {/* STEP 1: Identity */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>
                Step 1: Product Identity
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Enter the core branding and web address for your project.
              </p>
            </div>

            <Input
              label="Product / Startup Name"
              placeholder="e.g. Apex Telemetry"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="Website URL"
              placeholder="https://yourstartup.com"
              value={formData.website}
              onChange={(e) => handleFieldChange('website', e.target.value)}
              error={errors.website}
              prefix="https://"
              required
            />

            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-0)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-white)',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="One-line Tagline / Pitch"
              placeholder="What makes your product indispensable? (Max 120 chars)"
              value={formData.tagline}
              onChange={(e) => handleFieldChange('tagline', e.target.value)}
              error={errors.tagline}
              helperText="This is what thousands of visitors will read first on the leaderboard."
              required
            />

            {/* Brand Color Picker */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                Brand Accent Color
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {['#6366F1', '#F59E0B', '#10B981', '#EC4899', '#06B6D4', '#8B5CF6', '#F43F5E'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleFieldChange('brandColor', color)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: formData.brandColor === color ? '3px solid #fff' : '2px solid transparent',
                      cursor: 'pointer',
                      boxShadow: formData.brandColor === color ? `0 0 12px ${color}` : 'none'
                    }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant="primary" iconRight={ArrowRight} onClick={handleNextStep}>
                Continue to Details
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Details */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>
                Step 2: Deep Dive & Pitch
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Provide context for your listing page to convert curious visitors into users.
              </p>
            </div>

            <Textarea
              label="Full Description"
              placeholder="Explain the problem you solve, target audience, and architecture..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input
                label="Founder / Team X Handle"
                placeholder="e.g. dev_sarah"
                prefix="@"
                value={formData.maker}
                onChange={(e) => handleFieldChange('maker', e.target.value)}
              />

              <Input
                label="Pricing Model"
                placeholder="e.g. Free Tier + $29/mo"
                value={formData.pricing}
                onChange={(e) => handleFieldChange('pricing', e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button variant="ghost" icon={ArrowLeft} onClick={handlePrevStep}>
                Back
              </Button>
              <Button variant="primary" iconRight={ArrowRight} onClick={handleNextStep}>
                Continue to Bidding
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Bidding */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>
                Step 3: Stake Your Initial Bid
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Your initial bid determines your starting rank on the global leaderboard.
              </p>
            </div>

            <Input
              label={`Initial Bid Amount (Min: ₹200)`}
              type="number"
              prefix="₹"
              min="200"
              step="100"
              value={formData.bid}
              onChange={(e) => handleFieldChange('bid', e.target.value)}
              error={errors.bid}
            />

            {/* Quick Bid Presets */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button type="button" size="sm" variant="secondary" onClick={() => handleFieldChange('bid', '500')}>
                ₹500 (Starter)
              </Button>
              <Button type="button" size="sm" variant="secondary" onClick={() => handleFieldChange('bid', '2000')}>
                ₹2,000 (Mid)
              </Button>
              <Button type="button" size="sm" variant="secondary" onClick={() => handleFieldChange('bid', '5000')}>
                ₹5,000 (Top 10)
              </Button>
              {products[0] && (
                <Button
                  type="button"
                  size="sm"
                  variant="gold"
                  icon={Trophy}
                  onClick={() => handleFieldChange('bid', (products[0].bid + getMinimumIncrement(products[0].bid)).toString())}
                >
                  Take #1 ({formatCurrency(products[0].bid + getMinimumIncrement(products[0].bid))})
                </Button>
              )}
            </div>

            {/* Live Projected Rank Box */}
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: isTopRank
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(20, 23, 33, 0.8))'
                  : 'rgba(99, 102, 241, 0.08)',
                border: `1px solid ${isTopRank ? 'var(--border-gold)' : 'var(--border-indigo)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Projected Starting Position
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: isTopRank ? 'var(--color-gold)' : 'var(--text-white)',
                    marginTop: '0.2rem'
                  }}
                >
                  {isTopRank ? '👑 Rank #1 Spotlight Leader' : `Rank #${projectedRank} on Leaderboard`}
                </div>
              </div>

              <span className="num-tabular" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gold)' }}>
                {formatCurrency(numericBid)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button variant="ghost" icon={ArrowLeft} onClick={handlePrevStep}>
                Back
              </Button>
              <Button variant="primary" iconRight={ArrowRight} onClick={handleNextStep}>
                Review & Checkout
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: UPI Payment */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)' }}>
                Step 4: Pay via UPI & Launch
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Scan the QR code, complete your payment, and enter the transaction ID to activate your listing.
              </p>
            </div>

            {/* Amount Banner */}
            <div
              style={{
                background: isTopRank
                  ? 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(12,14,20,0.9))'
                  : 'rgba(99,102,241,0.08)',
                border: `1px solid ${isTopRank ? 'var(--border-gold)' : 'var(--border-indigo)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Amount to Pay</div>
                <div className="num-tabular" style={{ fontSize: '1.6rem', fontWeight: 900, color: isTopRank ? 'var(--color-gold)' : 'var(--text-white)' }}>
                  {formatCurrency(numericBid)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Projected Rank</div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: isTopRank ? 'var(--color-gold)' : 'var(--color-indigo)' }}>
                  #{projectedRank} on Board
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem',
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '3px solid var(--border-bright)'
              }}
            >
              <img
                src="/images/qr.jpeg"
                alt="UPI Payment QR Code"
                style={{ width: '190px', height: '190px', objectFit: 'contain', borderRadius: '6px' }}
              />
            </div>

            {/* UPI ID */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: 'var(--bg-surface-0)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>UPI ID</div>
                <div className="num-tabular" style={{ fontWeight: 700, color: 'var(--text-white)' }}>okbid@upi</div>
              </div>
              <button
                onClick={handleCopyUPI}
                style={{
                  background: qrCopied ? 'rgba(16,185,129,0.15)' : 'var(--bg-surface-2)',
                  border: `1px solid ${qrCopied ? 'var(--border-emerald)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: qrCopied ? 'var(--color-emerald)' : 'var(--text-muted)',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                {qrCopied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                {qrCopied ? 'Copied!' : 'Copy UPI'}
              </button>
            </div>

            <ol
              style={{
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                margin: 0
              }}
            >
              <li>Open PhonePe, GPay, Paytm, or BHIM</li>
              <li>Scan QR or enter UPI ID manually</li>
              <li>Pay exactly <strong style={{ color: 'var(--color-gold)' }}>{formatCurrency(numericBid)}</strong></li>
              <li>Copy the <strong style={{ color: 'var(--text-white)' }}>UTR / Transaction ID</strong> shown after payment</li>
            </ol>

            <Input
              label="UTR / Transaction ID"
              placeholder="e.g. 426190123456789"
              value={utrNumber}
              onChange={(e) => {
                setUtrNumber(e.target.value);
                if (e.target.value.trim()) setErrors((p) => ({ ...p, payment: null }));
              }}
              helperText="12–15 digit UTR or reference number from your UPI app."
              error={errors.payment}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="ghost" icon={ArrowLeft} onClick={handlePrevStep} disabled={isProcessing}>
                Back
              </Button>
              <Button
                variant={isTopRank ? 'gold' : 'primary'}
                icon={CheckCircle2}
                isLoading={isProcessing}
                onClick={handleCompleteSubmission}
              >
                {isProcessing ? 'Verifying...' : "I've Paid — Launch Listing"}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Success Screen */}
        {currentStep === 5 && createdProduct && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--color-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)'
              }}
            >
              <CheckCircle2 size={42} />
            </div>

            <h3 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-white)' }}>
              {createdProduct.name} is Live on OKBid!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.5 }}>
              Your product has officially entered the arena at{' '}
              <strong style={{ color: isTopRank ? 'var(--color-gold)' : 'var(--text-white)' }}>
                Rank #{predictRank(products, createdProduct.bid)}
              </strong>{' '}
              with a stake of <strong>{formatCurrency(createdProduct.bid)}</strong>.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to={`/product/${createdProduct.slug}`} style={{ textDecoration: 'none' }}>
                <Button variant="primary" iconRight={ArrowRight}>
                  View Product Page
                </Button>
              </Link>
              <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
                <Button variant="secondary">
                  View Live Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
