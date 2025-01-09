'use client';
import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  // {
  //   title: 'Roadmap',
  //   href: '',
  //   description:
  //     'View our upcoming features and vote on what you would like to see next.'
  // },
  {
    title: 'Blog',
    href: '/blog',
    description:
      'Read our latest blog posts for more insights on how to level up your skills.',
  },
  {
    title: 'Open Source',
    href: '/open-source',
    description: 'No secrets here, see how we build our platform.',
  },
  // {
  //   title: 'Changelog',
  //   href: '/changelog',
  //   description: 'Stay up to date with the latest changes to techblitz.'
  // },
  {
    title: 'FAQs',
    href: '/faqs',
    description: 'Got a question? We have an answer.',
  },
];

const features = [
  {
    title: 'Roadmaps',
    href: '/features/roadmap',
    description: 'Personalized paths to accelerate your learning journey.',
    ariaLabel: 'Navigate to Roadmaps',
  },
  {
    title: 'Daily Challenges',
    href: '/features/daily-challenges',
    description: 'Tackle daily challenges to sharpen your developer skills.',
    ariaLabel: 'Navigate to Daily Challenges',
  },
  {
    title: 'Statistics',
    href: '/features/statistics',
    description: 'Track your progress and see your growth over time.',
    ariaLabel: 'Navigate to Statistics',
  },
];

export function NavigationMenuItems() {
  return (
    <NavigationMenu
      className="py-2 px-4 hidden md:block"
      aria-label="Main navigation"
    >
      <NavigationMenuList>
        {process.env.NEXT_PUBLIC_ENV === 'development' && (
          <NavigationMenuItem>
            <NavigationMenuTrigger aria-label="Features menu">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid lg:p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                <ListItem
                  href="/features/roadmap"
                  title="Roadmaps"
                  aria-label="Navigate to Roadmaps"
                >
                  AI-powered paths to accelerate your learning journey.
                </ListItem>
                <ListItem
                  href="/features/daily-challenges"
                  title="Daily Challenges"
                  aria-label="Navigate to Daily Challenges"
                >
                  Tackle daily challenges to sharpen your developer skills.
                </ListItem>
                <ListItem
                  href="/features/leaderboards"
                  title="Leaderboards"
                  aria-label="Navigate to Leaderboards"
                >
                  Compete with friends and rise to the top.
                </ListItem>
                <ListItem
                  href="/features/"
                  title="Statistics"
                  aria-label="Navigate to Statistics"
                >
                  Gain insights and track your growth over time.
                </ListItem>
                <ListItem
                  href="/features/daily-challenges"
                  title="Daily Challenges"
                  aria-label="Navigate to Daily Challenges"
                >
                  Go beyond interviews — master real-world development.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        {process.env.NEXT_PUBLIC_ENV === 'production' && (
          <NavigationMenuItem>
            <NavigationMenuTrigger aria-label="Features menu">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {features.map((feature) => (
                  <ListItem
                    key={feature.title}
                    href={feature.href}
                    title={feature.title}
                    aria-label={feature.ariaLabel}
                  >
                    {feature.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Resources menu">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  aria-label={component.title}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/pricing"
            legacyBehavior
            passHref
            className="!text-white focus:!text-white"
            aria-label="Navigate to Pricing"
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="mailto:team@techblitz.dev"
            legacyBehavior
            passHref
            aria-label="Contact us via email"
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link
        href={props.href || '/'}
        ref={ref}
        className={cn(
          'group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-white hover:!text-white !font-onest',
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-white">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = 'ListItem';
