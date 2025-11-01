import React from 'react';
import Navbar from './components/Navbar';
import RecommendationCard from './components/RecommendationCard';
import { Filter } from 'lucide-react';

const ListPage = () => {
  const recommendations = [
    { id: 1, image: '/images/food1.jpg' },
    { id: 2, image: '/images/food2.jpg' },
    { id: 3, image: '/images/food3.jpg' },
    { id: 4, image: '/images/food4.jpg' },
    { id: 5, image: '/images/food5.jpg' },
  ];

  const thumbnails = [
    { id: 1, image: '/images/thumbnail1.jpg' },
    { id: 2, image: '/images/thumbnail2.jpg' },
    { id: 3, image: '/images/thumbnail3.jpg' },
    { id: 4, image: '/images/thumbnail4.jpg' },
  ];

  return (
    <div className="min-h-screen bg-[#F5E8D3]">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Thumbnail Scroll Section */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {thumbnails.map((item) => (
                <div 
                  key={item.id}
                  className="flex-none w-24 h-24 rounded-2xl overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Rekomendasi UMKM Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Rekomendasi UMKM</h2>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                </button>
              </div>

              <div className="space-y-4">
                {recommendations.map((item) => (
                  <RecommendationCard
                    key={item.id}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="rounded-3xl overflow-hidden h-[calc(100vh-2rem)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3953.1675753979013!2d110.37715931477673!3d-7.782804394388685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1635825645789!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;