import React from 'react';

interface Card2Props {
  title: string;
  description?: string;
  image: string;
}

const Card2 = ({ title, description, image }: Card2Props) => {
  return (
    <div className="relative rounded-3xl overflow-hidden h-[500px]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(107, 78, 49, 0.95))' }}>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3 className="text-white text-2xl font-semibold mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-white text-base mb-4">
              {description}
            </p>
          )}
          <button className="bg-white text-black w-28 px-6 py-2 rounded-full text-sm hover:bg-gray-100">
            Jelajah
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card2;