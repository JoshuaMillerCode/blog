import Link from 'next/link';
import Image from 'next/image';
import DeskLogo from './DeskLogo';
import { logout } from '../../lib/auth';
import { AuthContext } from '../../lib/AuthContext';
import { useContext } from 'react';
import { Admin } from '../../lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';


export default function SiteLogo({ user }: {user: Admin | null}): JSX.Element {
  const { setUser } = useContext(AuthContext);

  function handleLogout() {
    logout();
    setUser(null)
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between px-4 py-4 md:flex-row lg:px-0">
      <h1 className="flex space-x-4">
        {/* <Link href="/" className="underline">
          <FontAwesomeIcon icon={faYoutube} style={{color: "#ff0030", fontSize: "5em"}} />
        </Link> */}
        <DeskLogo className="h-8 w-8" />
        
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-3xl  font-bold  text-transparent dark:from-cyan-300 dark:to-teal-200"
        >
          YourAverageDev Blog
        </Link>
      </h1>
      <span className="relative hidden text-lg tracking-wide text-zinc-500 dark:text-zinc-200 md:flex">
      {
        user ? (
          <div className="flex items-center space-x-4">
            <Link href="/posts/new">
              Create
            </Link>
            <Link href="/edit-books">
              Books
            </Link>
            {"  "}
            <Link href="/" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : ("")
      }
      </span>
    </div>
  );
}
