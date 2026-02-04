import React from 'react';
import Banner from '../components/home/Banner';
import { Outlet } from 'react-router';
import Features from '../components/home/Features';
import ContactUs from '../components/home/ContactUs';

const Home = () => {
  return (
    <div>
      <Banner />
      <Outlet />
      <Features />
      <ContactUs />
    </div>
  );
};

export default Home;
