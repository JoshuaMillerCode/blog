'use client'
import React from 'react';
import '../styles/globals.css';
import Generator from 'next/font/local';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createContext, useState, useEffect } from 'react';
import { decodeToken } from '../lib/auth';
import { Admin } from '../lib/types';
import { useRouter } from 'next/navigation';


//Auth User Context
export const AuthContext = createContext<any>({});

const sans = Generator({
  src: '../fonts/Generator-Variable.ttf',
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Admin | null>(null);
  const code = 'theonering'
  let input = ''
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }
  }, []);

  // fun easter egg
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      input += event.key;

      if (input.includes(code)) {
        console.log('code entered');
        router.push('/admin-login');
        input = '';
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);


  return (
    <html lang="en" className={`${sans.variable} font-sans`}>
      <body className="bg-white dark:bg-zinc-950">
        <AuthContext.Provider value={{user, setUser}}>
          <Header user={user} />
          {children}
          <Footer />
        </AuthContext.Provider>
      </body>
    </html>
  );
}
