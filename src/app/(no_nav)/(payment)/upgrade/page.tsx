import { getStripeProducts } from '@/actions/stripe/stripe-products';
import Logo from '@/components/ui/logo';
import { PricingCard } from '@/components/payment/payment-card';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useUserServer } from '@/hooks/useUserServer';
import { StarsBackground } from '@/components/ui/stars-background';

export default async function UpgradePage() {
  // get the products
  const products = await getStripeProducts();

  // get the current user (for prefilling the form)
  const user = await useUserServer();

  return (
    <div className="relative">
      <StarsBackground className="-z-10" />
      <Link
        href="/dashboard"
        className="absolute top-8 left-8 z-50"
        aria-label="Go back to dashboard"
      >
        <Logo />
      </Link>
      <Link
        href="/dashboard"
        className="font-semibold top-5 right-5 absolute font-satoshi text-2xl z-[10000] hover:text-white/80 duration-300"
      >
        <X className="size-5" />
      </Link>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="w-full lg:h-svh flex flex-col pt-32 md:py-8 container z-50 relative items-center justify-center text-center">
        <h1 className="text-gradient from-white to-white/75 text-3xl lg:text-5xl !font-onest tracking-tight py-1">
          Simple and affordable <br /> pricing plans
        </h1>

        <div className="flex flex-col w-full mt-6">
          <p className="text-center text-sm">
            Upgrade your account to unlock premium features, gain access to
            exclusive content, and be the first to experience new updates.
          </p>
          <div className="flex flex-col md:flex-row gap-10 justify-center mt-8 md:mt-16 px-2 md:px-10">
            {products?.map((product) => (
              <PricingCard
                user={user}
                key={product.id}
                product={product}
                isLoading={false}
                billingPeriod="month"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
