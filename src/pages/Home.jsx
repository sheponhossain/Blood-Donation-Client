import React from 'react';
import { Outlet } from 'react-router';
import Banner from '../components/home/Banner';
import Features from '../components/home/Features';
import DonationProcess from '../components/home/DonationProcess';
import Eligibility from '../components/home/Eligibility';
import SuccessStories from '../components/home/SuccessStories';
import FAQ from '../components/home/FAQ';
import DonationMap from '../components/home/DonationMap';
import ContactUs from '../components/home/ContactUs';

const Home = () => {
  return (
    <div className="bg-[#FAFAFB] dark:bg-slate-950 transition-colors duration-300">
      <Banner />
      <Outlet />
      <div className="space-y-12 md:space-y-12 pb-20">
        <Features />

        <DonationProcess />

        <Eligibility />

        <SuccessStories />

        <FAQ />

        <DonationMap />

        <ContactUs />
      </div>
    </div>
  );
};

export default Home;
