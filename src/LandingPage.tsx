import Card from './components/Card';
import Card2 from './components/Card2';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5E8D3]">
      <Navbar />
      <HeroSection />

      {/* Featured Cards Section */}
      <div className="container mx-auto px-4 py-12">
        {/* First Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card
            title="Lores Ipsum bla bla bla bla bla bla bla"
            image="/images/food.jpeg"
          />
          <Card
            title="Lores Ipsum bla bla bla"
            image="/images/product.jpg"
          />
        </div>

        {/* Second Row - 1 Card */}
        <div className="grid grid-cols-1 mb-16">
          <Card2
            title="Lores Ipsum bla bla bla bla bla bla"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor"
            image="/images/service.jpg"
          />
        </div>

        {/* UMKM Disekitar Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">UMKM Disekitar</h2>
          <div className="rounded-3xl overflow-hidden h-[400px]">
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

        {/* About Us and Category Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            {/* Add about us content here if needed */}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Category</h2>
            <ul className="space-y-3">
              <li>Makanan</li>
              <li>Produk</li>
              <li>Jasa</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;