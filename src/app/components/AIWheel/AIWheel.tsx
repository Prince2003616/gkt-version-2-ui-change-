import React from 'react';
import Image from 'next/image';

const AIWheel: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent -ml-52 lg:-ml-15">
        Artificial Intelligence
      </h2>
            
      <div className="relative group transition-all duration-500 px-8 mt-8 hover:scale-105">
        <Image
          src="/aiwheel.png"
          alt="AI Solutions Wheel"
          width={800}
          height={800}
          className="relative w-full h-auto rounded-lg transition-all duration-500"
          priority
        />
      </div>
    </div>
  );
};

export default AIWheel; 