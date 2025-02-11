import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ }) => {
  return (
    <header className="header">
      <div className="logo">News Aggregator</div>
    </header>
  );
};

export default Header;