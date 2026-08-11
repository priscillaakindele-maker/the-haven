import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedRooms } from '../components/FeaturedRooms';
import { LuxuryAmenities } from '../components/LuxuryAmenities';
import { RestaurantShowcase } from '../components/RestaurantShowcase';
import { SpaPreview } from '../components/SpaPreview';
import { GuestTestimonials } from '../components/GuestTestimonials';
import { AwardsSection } from '../components/AwardsSection';
import { InstagramGallery } from '../components/InstagramGallery';
import { LocationMapSection } from '../components/LocationMapSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedRooms />
      <LuxuryAmenities />
      <RestaurantShowcase />
      <SpaPreview />
      <GuestTestimonials />
      <AwardsSection />
      <InstagramGallery />
      <LocationMapSection />
    </div>
  );
};
