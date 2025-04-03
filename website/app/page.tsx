import CheckoutPanel from '@/framework/next/components/checkout-panel';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="text-gray-500 mt-2">Complete your purchase securely</p>
        </div>

        <CheckoutPanel />
      </div>
    </main>
  );
}
