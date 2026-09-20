import React, { useState } from 'react';
import { Badge } from '../../components/Badge/Badge';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is OKBid?',
      a: 'OKBid is a high-stakes, competitive product discovery board inspired by the mechanics of outbid.lol. Instead of opaque algorithms, SEO tricks, or editorial favor, rank position is purely determined by the capital staked on each product listing.'
    },
    {
      q: 'How does outbidding work?',
      a: 'Any maker, founder, or supporter can click "Outbid" on any listing. By offering a bid higher than the current stake (plus the required minimum increment), your product will immediately take their rank position and claim the spotlight.'
    },
    {
      q: 'What happens when someone outbids me?',
      a: 'When another product stakes a higher bid, your product automatically moves down one rank position. You will receive an activity log entry, and you can outbid them back at any time.'
    },
    {
      q: 'How is traffic routed to my product?',
      a: 'Every listing on OKBid features a direct outbound link to your landing page or app store listing. Visitors can click through directly. We record every outbound click and display transparent performance analytics on your product profile.'
    },
    {
      q: 'Is this real money or a simulation?',
      a: 'This frontend demonstrates the full OKBid experience with a built-in sandbox mock checkout. You can place test stakes, test card checkouts, experience live rank shifts, and explore full persistent state without spending real money.'
    },
    {
      q: 'Can I edit my product information after listing?',
      a: 'Yes! Listings are saved locally in your browser storage and will retain all updates, stakes, clicks, and category assignments across page refreshes.'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Badge variant="indigo" size="sm" icon={HelpCircle} style={{ marginBottom: '0.5rem' }}>
          Got Questions?
        </Badge>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
          Everything you need to know about the OKBid competitive product arena.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.25rem 1.5rem',
                cursor: 'pointer'
              }}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-white)' }}>
                  {faq.q}
                </h3>
                <span style={{ color: 'var(--text-dim)' }}>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </div>

              {isOpen && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginTop: '0.875rem' }}>
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
