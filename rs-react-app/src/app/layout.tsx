import '@/index.css';
import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';
import { Providers } from '@/components/Providers/Providers';
export const metadata: Metadata = {
  title: 'Rick&Morty',
  description:
    'This is an app that can display all characters from Rick and Morty universe',
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="root">{children}</div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
