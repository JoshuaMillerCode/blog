import React from 'react';
import { JSX } from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-between px-4 py-4 text-xs md:text-sm lg:px-0 lg:text-base">
      <a
        href="https://www.cosmicjs.com"
        target="_blank"
        className="no-underline"
      >
      </a>
      <div className="text-zinc-700 dark:text-zinc-300">
        &copy;&nbsp;{new Date().getFullYear()} Your Average Dev
      </div>
    </footer>
  );
}
