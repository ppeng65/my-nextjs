import type { NextPage } from 'next';
import React from 'react';
import Index from 'components/Navbar';
import Footer from 'components/Footer';

interface IProps {
  children: React.ReactNode;
}

const layout: NextPage<IProps> = ({ children }) => {
  return (
    <>
      <Index />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
