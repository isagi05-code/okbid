import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { useApp } from '../../context/AppContext';
import { getMinimumOutbid, getMinimumIncrement, predictRank } from '../../utils/ranking';
import { formatCurrency } from '../../utils/formatting';
import { Zap, CheckCircle2, Sparkles, Copy, QrCode, ShieldCheck, RefreshCw } from 'lucide-react';

export function OutbidModal() {
  const { products, outbidModalProduct, closeOutbidModal, placeOutbid } = useApp();

  const [bidAmount, setBidAmount] = useState('');
  const [note, setNote] = useState('');
  const [step, setStep] = useState('bid'); // 'bid' | 'qr' | 'confirm' | 'success'
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [qrCopied, setQrCopied] = useState(false);

  const currentBid = outbidModalProduct ? outbidModalProduct.bid : 0;
  const minRequiredBid = outbidModalProduct ? getMinimumOutbid(currentBid) : 0;
  const minIncrement = outbidModalProduct ? getMinimumIncrement(currentBid) : 0;

  useEffect(() => {
    if (outbidModalProduct) {
      const min = getMinimumOutbid(outbidModalProduct.bid);
      setBidAmount(min.toString());
      setStep('bid');
      setError('');
      setNote('');
      setUtrNumber('');
      setIsProcessing(false);
    }
  }, [outbidModalProduct]);

  if (!outbidModalProduct) return null;

  const numericBid = Number(bidAmount) || 0;
  const projectedRank = predictRank(products, numericBid, outbidModalProduct.id);
  const isTopRank = projectedRank === 1;

  const handleQuickAdd = (addAmount) => {
    const currentNum = Number(bidAmount) || minRequiredBid;
    setBidAmount((currentNum + addAmount).toString());
    setError('');
  };

  const handleSetMatchFirst = () => {
    const topProduct = products[0];
    if (!topProduct) return;
    const beatTop = topProduct.bid + getMinimumIncrement(topProduct.bid);
    setBidAmount(beatTop.toString());
    setError('');
  };

  const handleProceedToQR = (e) => {
    e.preventDefault();
    if (numericBid < minRequiredBid) {
      setError(`Bid must be at least ${formatCurrency(minRequiredBid)}`);
      return;
    }
    setError('');
    setStep('qr');
  };

  const handleCopyUPI = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('okbid@upi');
    }
    setQrCopied(true);
    setTimeout(() => setQrCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    if (!utrNumber.trim()) {
      setError('Please enter the UTR / Transaction ID after paying.');
      return;
    }
    setIsProcessing(true);
    setError('');

    // Simulate a brief verification delay
    setTimeout(() => {
      const success = placeOutbid(outbidModalProduct.id, numericBid, note);
      if (success) {
        setStep('success');
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <Modal
      isOpen={!!outbidModalProduct}
      onClose={closeOutbidModal}
      title={step === 'success' ? 'Spot Claimed! 🎉' : `Outbid ${outbidModalProduct.name}`}
      subtitle={
        step === 'success'
          ? 'Your new stake is now live on the board'
          : `Currently Rank #${outbidModalProduct.rank} · Staked ${formatCurrency(currentBid)}`
      }
      maxWidth="500px"
    >
      {/* STEP 1: Enter Bid Amount */}
      {step === 'bid' && (
        <form onSubmit={handleProceedToQR} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Target Product Summary */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              background: 'var(--bg-surface-0)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: outbidModalProduct.brandColor || 'var(--color-indigo)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}
              >
                {outbidModalProduct.logoLetter || outbidModalProduct.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-white)' }}>
                  {outbidModalProduct.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {outbidModalProduct.category}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Current Stake</div>
              <div className="num-tabular" style={{ fontWeight: 700, color: 'var(--color-gold)' }}>
                {formatCurrency(currentBid)}
              </div>
            </div>
          </div>

          {/* Bid Input */}
          <Input
            label={`Your New Bid (Min: ${formatCurrency(minRequiredBid)})`}
            type="number"
            prefix="₹"
            value={bidAmount}
            onChange={(e) => {
              setBidAmount(e.target.value);
              if (Number(e.target.value) >= minRequiredBid) setError('');
            }}
            error={error}
            min={minRequiredBid}
            step={minIncrement}
            required
          />

          {/* Quick Add Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button type="button" size="sm" variant="secondary" onClick={() => handleQuickAdd(100)}>
              +₹100
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => handleQuickAdd(250)}>
              +₹250
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => handleQuickAdd(500)}>
              +₹500
            </Button>
            {products[0]?.id !== outbidModalProduct.id && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                icon={Sparkles}
                onClick={handleSetMatchFirst}
              >
                Claim #1
              </Button>
            )}
          </div>

          {/* Projected Rank Indicator */}
          <div
            style={{
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius-md)',
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
                Projected Position
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: isTopRank ? 'var(--color-gold)' : 'var(--color-indigo)',
                  marginTop: '0.1rem'
                }}
              >
                {isTopRank ? '👑 Rank #1 Spotlight' : `Rank #${projectedRank}`}
              </div>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                background: isTopRank ? 'var(--color-gold)' : 'var(--color-indigo)',
                color: '#000',
                fontWeight: 700
              }}
            >
              {outbidModalProduct.rank > projectedRank
                ? `▲ +${outbidModalProduct.rank - projectedRank} spots`
                : 'Holding rank'}
            </span>
          </div>

          <Input
            label="Note (Optional)"
            placeholder="e.g. Securing the #1 AI dev spot!"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button type="button" variant="ghost" onClick={closeOutbidModal} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={isTopRank ? 'gold' : 'primary'}
              icon={QrCode}
              style={{ flex: 2 }}
            >
              Pay {formatCurrency(numericBid)} via UPI
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: QR Code Payment */}
      {step === 'qr' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
              <div className="num-tabular" style={{ fontSize: '1.65rem', fontWeight: 900, color: isTopRank ? 'var(--color-gold)' : 'var(--text-white)' }}>
                {formatCurrency(numericBid)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Target Rank</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: isTopRank ? 'var(--color-gold)' : 'var(--color-indigo)' }}>
                #{projectedRank}
              </div>
            </div>
          </div>

          {/* QR Code Image */}
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
              alt="UPI Payment QR Code — Scan to pay for OKBid stake"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                borderRadius: '6px'
              }}
              onError={(e) => {
                // Fallback if image not found yet
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback placeholder (hidden by default) */}
            <div
              style={{
                display: 'none',
                width: '200px',
                height: '200px',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: '#f8f8f8',
                borderRadius: '6px',
                gap: '0.5rem'
              }}
            >
              <QrCode size={64} color="#333" />
              <span style={{ color: '#333', fontSize: '0.8rem', fontWeight: 600 }}>QR Code Loading...</span>
            </div>
          </div>

          {/* UPI ID Copy Row */}
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
              <div className="num-tabular" style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '0.95rem' }}>
                okbid@upi
              </div>
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
                gap: '0.35rem',
                transition: 'all 0.15s ease'
              }}
            >
              {qrCopied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              {qrCopied ? 'Copied!' : 'Copy UPI'}
            </button>
          </div>

          {/* Instructions */}
          <ol
            style={{
              paddingLeft: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              margin: 0
            }}
          >
            <li>Open any UPI app (PhonePe, GPay, Paytm, BHIM)</li>
            <li>Scan the QR code or manually enter UPI ID</li>
            <li>Pay exactly <strong style={{ color: 'var(--color-gold)' }}>{formatCurrency(numericBid)}</strong></li>
            <li>Note the <strong style={{ color: 'var(--text-white)' }}>UTR / Transaction ID</strong> from the payment confirmation</li>
          </ol>

          {/* UTR Entry */}
          <Input
            label="UTR / Transaction ID"
            placeholder="e.g. 426190123456789"
            value={utrNumber}
            onChange={(e) => {
              setUtrNumber(e.target.value);
              if (e.target.value.trim()) setError('');
            }}
            helperText="Paste the 12–15 digit UTR or reference number from your UPI app."
            error={error}
          />

          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textAlign: 'center', margin: 0 }}>
            <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} color="var(--color-emerald)" />
            Your rank will be updated instantly after confirmation.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep('bid')}
              disabled={isProcessing}
              style={{ flex: 1 }}
            >
              Back
            </Button>
            <Button
              type="button"
              variant={isTopRank ? 'gold' : 'primary'}
              isLoading={isProcessing}
              onClick={handleConfirmPayment}
              icon={isProcessing ? undefined : CheckCircle2}
              style={{ flex: 2 }}
            >
              {isProcessing ? 'Verifying...' : "I've Paid — Confirm Rank"}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Success */}
      {step === 'success' && (
        <div
          style={{
            textAlign: 'center',
            padding: '1rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--color-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)'
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-white)' }}>
              Outbid Confirmed!
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {outbidModalProduct.name} is now at Rank #{projectedRank} with{' '}
              <strong style={{ color: 'var(--color-gold)' }}>{formatCurrency(numericBid)}</strong> staked.
            </p>
            {utrNumber && (
              <p
                className="num-tabular"
                style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}
              >
                UTR Reference: {utrNumber}
              </p>
            )}
          </div>

          <Button
            variant="primary"
            onClick={closeOutbidModal}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}
