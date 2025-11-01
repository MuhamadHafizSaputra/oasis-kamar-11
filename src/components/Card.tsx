import React from 'react';

interface CardProps {
  title: string;
  image: string;
}

const Card = ({ title, image }: CardProps) => {
  return (
    <div className="rounded-3xl h-[500px] relative overflow-hidden">
      <div className="h-3/4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-3xl"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[#6B4E31] p-8">
        <div className="flex justify-between items-center h-full">
          <h3 className="text-white text-2xl font-semibold max-w-[60%]">
            {title}
          </h3>
          <button className="bg-white text-black w-28 px-6 py-2 rounded-full text-sm hover:bg-gray-100">
            Jelajah
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;