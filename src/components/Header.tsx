import React, { useState } from 'react';

interface HeaderProps {
  onOpenSideBar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSideBar}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
     <div className="header">
      <div className="menu-icon">
        <svg
        onClick={onOpenSideBar}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="white"
        >
          <path d="M3 6h18M3 12h18m-18 6h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className="site-title">News Aggregator</span>
    </div>
  </>
    
  );
};

export default Header;