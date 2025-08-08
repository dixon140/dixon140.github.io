import React from 'react';

const Hero = () => (
  <section
    className="flex flex-col items-center justify-center rounded-2xl mb-10 px-6 py-14 text-[var(--hero-text)]
               shadow-[0_8px_32px_0_rgba(31,38,135,0.18)] backdrop-blur-[18px]
               border border-white/10"
    style={{ background: 'var(--hero-bg)' }}
  >
    {/* Optional avatar */}
    <h1 className="gradient text-[2.4rem] sm:text-[2.8rem] tracking-[2px] mb-4 font-bold">Ethan Dixon</h1>
    <h2 className="text-[1.25rem] sm:text-[1.5rem] font-normal text-[var(--hero-accent)] mb-2">
      Full-Stack & Application Developer
    </h2>
    <p className="text-[1.05rem] max-w-[520px] text-center m-0">
      I specialize in building high-performance applications with C++ and C, from robust desktop software to efficient systems tools. Passionate about solving complex problems, optimizing code, and delivering reliable solutions for real-world challenges.
    </p>
  </section>
);

export default Hero; 