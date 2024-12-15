import Link from 'next/link';
import Logo from '../../ui/logo';
import SocialLinks from './socials';
import { Button } from '../../ui/button';
import { ArrowRight } from 'lucide-react';
import { Separator } from '../../ui/separator';

const footerItems = [
  {
    title: 'Platform',
    links: [
      {
        title: 'Features',
        href: '/features'
      },
      {
        title: 'How it works',
        href: '/integrations'
      },
      {
        title: 'FAQs',
        href: '/faqs'
      }
    ]
  },
  {
    title: 'Pricing',
    links: [
      {
        title: 'Plans',
        href: '/pricing'
      },
      {
        title: 'Education',
        href: '/education'
      }
    ]
  },
  {
    title: 'Contact',
    links: [
      {
        title: 'Contact Us',
        href: '/contact'
      }
    ]
  }
];

// just three itemss with no header
const productionFooterItems = [
  {
    title: 'Pricing',
    link: '/pricing'
  },
  {
    title: 'FAQs',
    link: '/faqs'
  },
  {
    title: 'Contact',
    link: 'mailto:team@techblitz.dev'
  }
];

export default function MarketingFooter() {
  return (
    <footer className="py-8 container">
      <div className="flex flex-col lg:flex-row justify-between text-white">
        <div className="flex flex-col gap-y-12 w-full">
          {process.env.NEXT_PUBLIC_ENV === 'development' ? (
            <div className="flex flex-col lg:flex-row w-full justify-between">
              <div className="flex flex-col gap-y-8 lg:flex-row gap-x-28">
                <div className="space-y-5">
                  <Logo />
                  <Button
                    variant="accent"
                    className="items-center flex md:hidden w-fit font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                    href="/signup"
                  >
                    Get Started for Free
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-6">
                  {footerItems.map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col gap-y-3"
                    >
                      <h6 className="font-bold">{item.title}</h6>
                      <ul className="flex flex-col gap-y-2">
                        {item.links &&
                          item.links.map((link) => (
                            <li key={link.title}>
                              <Link
                                href={link.href}
                                className="text-sm hover:text-gray-400 duration-300"
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 lg:mt-0 space-y-2">
                <Button
                  variant="accent"
                  className="items-center hidden md:flex w-fit font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                  href="/signup"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex md:items-center flex-col sm:flex-row gap-y-5 gap-x-16">
              <Link href="/">
                <Logo />
              </Link>
              {/** pricing, faqs and contact in the footer on prod */}
              <div className="flex flex-col sm:flex-row gap-x-10 gap-y-6">
                {productionFooterItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-y-3"
                  >
                    <ul className="flex flex-col gap-y-2">
                      <li>
                        <Link
                          href={item.link}
                          className="hover:text-accent duration-300 hover:cursor-pointer"
                        >
                          {item.title}
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-4">
            <SocialLinks />
            <Separator className="bg-black-50" />
            <div className="flex flex-col sm:flex-row w-full justify-between items-center">
              <p className="text-xs">
                &copy; 2024 techblitz. All rights reserved.
              </p>
              <ul className="flex items-center gap-x-4 text-xs mt-4 sm:mt-0">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-accent duration-300 hover:cursor-pointer"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-accent duration-300 hover:cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
