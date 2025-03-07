import React from 'react';
import SiteLogo from './logos/SiteLogo';
import { Admin } from '../lib/types';
import { JSX } from 'react';


export default function Header({ user }: { user: Admin | null }): JSX.Element {
  return (
    <header className="sticky top-0 z-10 mx-auto  backdrop-blur-lg bg-zinc-950/75">
      <SiteLogo user={user} />
    </header>
  );
}
