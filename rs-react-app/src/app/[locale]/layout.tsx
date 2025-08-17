import '@/index.css';
import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Providers } from '@/components/Providers/Providers';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Rick&Morty',
  description:
    'This is an app that can display all characters from Rick and Morty universe',
};

const RootLayout: FC<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}> = async ({ children, params }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <div id="root">{children}</div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
