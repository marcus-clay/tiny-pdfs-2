import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { SignOutButton } from './SignOutButton';

interface HeaderProps {
  onSignOut: () => void;
  onLogoClick: () => void;
}

export function Header({ onSignOut, onLogoClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo onClick={onLogoClick} />
            <Navigation />
          </div>
          <SignOutButton onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
}