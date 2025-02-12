import React from 'react';
import styles from '../styles/Footer.module.css';
interface footerProps {
    artLength: number;
}
const Footer: React.FC<footerProps> = ({ artLength }) => {
  return (
    <footer className={ artLength > 5 ? styles.footer : styles.footers}>
      <p>© {new Date().getFullYear()} News Aggregator | Built using React & TypeScript. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
