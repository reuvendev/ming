import React from 'react';
import { UserProvider } from '@/context/UserContext';
import './globals.css';

export const metadata = {
  title: 'Ming Focus Studio',
  description: 'Study tracking and focus app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}