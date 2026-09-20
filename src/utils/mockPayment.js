// Mock payment processing simulator with realistic latency and receipt generator

export function simulatePayment({ amount, product, cardDetails = {} }) {
  return new Promise((resolve, reject) => {
    // Simulate network delay between 800ms and 1500ms
    const delay = Math.floor(Math.random() * 700) + 800;

    setTimeout(() => {
      // 99.5% success rate for smooth demo
      const isSuccess = Math.random() > 0.005;

      if (isSuccess) {
        const transactionId = 'tx_' + Math.random().toString(36).substring(2, 11).toUpperCase();
        resolve({
          success: true,
          transactionId,
          amount,
          productName: product?.name || 'Product',
          timestamp: new Date().toISOString(),
          receiptUrl: `#receipt-${transactionId}`
        });
      } else {
        reject(new Error('Simulated payment declined. Please try again with a valid mock card.'));
      }
    }, delay);
  });
}
