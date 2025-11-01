import Card from './components/Card';
import Card2 from './components/Card2';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import './App.css'

function App() {
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
        <div className="grid grid-cols-1">
          <Card2
            title="Lores Ipsum bla bla bla bla bla bla"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor"
            image="/images/service.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
