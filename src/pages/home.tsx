import Balatro from "@/components/Balatro";
import ScrollVelocity from "@/components/ScrollVelocity";
import LightRays from "@/components/LightRays";
import artistImage from "@/assets/Screenshot_8-3-2026_21330_www.instagram.com.jpeg";

const Home = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* 1. Main Background Layer */}
      <div className="absolute inset-0 -z-30">
        <Balatro
          isRotate={false}
          mouseInteraction
          pixelFilter={1800}
          lighting={0.1}
  color1="#000000"
  color2="#d4af37"
  color3="#1d1c16"
        />
      </div>
{/* Overlay to darken the background and enhance contrast for the hero content */ }
      <div className="absolute inset-0 -z-20 bg-black/50" />
      {/* 2. Light Rays Layer (specifically behind the artist image) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
         <LightRays
    raysOrigin="top-center"
    raysColor="#d4af37"
    raysSpeed={1}
    lightSpread={0.5}
    rayLength={3}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0}
    distortion={0}
    className="custom-rays"
    pulsating={false}
    fadeDistance={1}
    saturation={1}
/>
      </div>

      {/* 3. Hero Content */}
      <div className="flex flex-col items-center gap-12 z-10 w-full pointer-events-none">
        {/* Circular Artist Image */}
        <div className="relative group pointer-events-auto">
           {/* Secondary glow tight to the circle */}
           <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl group-hover:bg-white/40 transition-all duration-700" />
           
           <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white/20 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.3)]">
            <img
              src={artistImage}
              alt="Ayssar Tarabay"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Name with Scroll Velocity */}
        <div className="w-full overflow-hidden">
          <ScrollVelocity
            texts={["Ayssar Tarabay", "Ayssar Tarabay"]}
            velocity={50}
            className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] uppercase font-black"
            scrollerClassName="text-6xl md:text-8xl lg:text-9xl"
            numCopies={6}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;