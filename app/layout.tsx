import React from 'react';
import '../styles/globals.css';
import Generator from 'next/font/local';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sans = Generator({
  src: '../fonts/Generator-Variable.ttf',
  variable: '--font-sans',
});

export async function generateMetadata() {
  return {
    title: "Your Average Developer's Blog",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} font-sans`}>
      <body className="bg-white dark:bg-zinc-950">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
