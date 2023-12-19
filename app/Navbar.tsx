import React from 'react';
import Link from 'next/link';
const Navbar = () => {
  const links = [
    { id: 1, label: 'Home', href: '/' },
    { id: 2, label: 'Deparment', href: '/dashboard/department' },
    { id: 3, label: 'Users', href: '/dashboard/user' },
  ];
  return (
    <header className="w-full py-8 px-6 border-b mb-4">
      <nav className="flex items-center gap-6">
        <Link href="/">My Company</Link>
        <ul className="flex gap-6 items-center">
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
