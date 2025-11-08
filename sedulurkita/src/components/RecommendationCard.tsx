import React from 'react';

interface RecommendationCardProps {
  image: string;
  title?: string;
}

const RecommendationCard = ({ image, title }: RecommendationCardProps) => {
  return (
    <div className="flex bg-[#6B4E31] rounded-2xl overflow-hidden h-24">
      <div className="w-32 h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4">
        {/* Content can be added here */}
      </div>
    </div>
  );
};

export default RecommendationCard;