import React from 'react';
import SearchSection from './SearchSection';

const HeroSection = () => {
  return (
    <div className="bg-[#F5E8D3] py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">LORES IPSUM</h1>
        <p className="text-xl mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <SearchSection />
      </div>
    </div>
  );
};

export default HeroSection;