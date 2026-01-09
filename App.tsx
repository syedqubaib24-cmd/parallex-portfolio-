
import React, { useState, useEffect, useRef } from 'react';
import { TOTAL_FRAMES, getFrameUrl, LEARNING_PATHS, SOCIAL_ICONS, ACCENT_ORANGE } from './constants';
import { ChevronDown, Youtube, Instagram, Twitter, Menu, Plus, Minus } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [accentColor] = useState(ACCENT_ORANGE);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const targetFrameRef = useRef(0);
  const smoothedFrameRef = useRef(0);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const framesToLoad = TOTAL_FRAMES;
    
    const preload = async () => {
      for (let i = 0; i < framesToLoad; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / framesToLoad) * 100));
          if (loadedCount === framesToLoad) {
            setLoading(false);
          }
        };
        img.onerror = () => {
           loadedCount++;
           if (loadedCount === framesToLoad) setLoading(false);
        };
      }
    };
    preload();
  }, []);

  // Animation Loop for Smooth Frame Interpolation
  useEffect(() => {
    const animate = () => {
      // Linear interpolation (lerp) for smooth movement
      // The lower the multiplier (0.1), the "heavier" and smoother the scroll feels
      const diff = targetFrameRef.current - smoothedFrameRef.current;
      smoothedFrameRef.current += diff * 0.12;

      const frameToSet = Math.round(smoothedFrameRef.current);
      if (frameToSet !== currentFrame) {
        setCurrentFrame(frameToSet);
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    if (!loading) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [loading, currentFrame]);

  // Scroll logic for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
      
      // We only care about scroll within the hero container
      if (scrollTop <= maxScroll) {
        const scrollFraction = scrollTop / maxScroll;
        targetFrameRef.current = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(scrollFraction * TOTAL_FRAMES))
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white p-10">
        <div className="mb-8 text-4xl font-black tracking-tighter italic">OBAID<span style={{ color: accentColor }}>COMMUNITY</span></div>
        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-300"
            style={{ width: `${loadProgress}%`, backgroundColor: accentColor }}
          />
        </div>
        <div className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">{loadProgress}% CACHING CINEMATICS</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
      {/* Sticky Header */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl font-black cursor-pointer tracking-tighter">OBAID.</div>
        <div className="flex items-center gap-6">
          <button className="hidden md:block text-[10px] font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">Menu</button>
          <Menu className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" />
        </div>
      </nav>

      {/* Hero Section Container */}
      <div ref={containerRef} className="parallax-container relative">
        <div className="hero-sticky rounded-bottom-parallax overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <img 
              src={getFrameUrl(currentFrame)} 
              alt="Parallax frame"
              className="w-full h-full object-cover rounded-bottom-parallax"
              style={{ 
                opacity: 1,
                filter: 'brightness(0.8) contrast(1.1)' 
              }}
            />
            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
            
            {/* Left Block - Identity */}
            <div className="flex flex-col space-y-2 md:space-y-4 max-w-xl text-left mt-20 md:mt-0">
              <span className="uppercase tracking-[0.4em] text-[10px] font-bold" style={{ color: accentColor }}>
                Hey, welcome to the
              </span>
              <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase">
                Obaidnocode<br />
                <span className="text-transparent border-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Community</span>
              </h1>
              
              {/* Skill Indicators */}
              <div className="flex flex-wrap gap-6 md:gap-10 pt-10">
                {LEARNING_PATHS.slice(0, 4).map((path) => (
                  <div key={path.id} className="flex flex-col group cursor-default">
                    <span className="text-[9px] opacity-40 font-mono mb-1 transition-colors group-hover:text-orange-500">{path.index}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest transition-transform group-hover:translate-x-1">{path.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Block - Value Prop */}
            <div className="max-w-md text-right md:mt-24 mt-12">
              <h2 className="text-2xl md:text-5xl font-black leading-[1.1] mb-6 uppercase tracking-tighter">
                Build Stunning<br />Websites & AI Apps<br />Faster With AI.
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal max-w-sm ml-auto">
                Learn how to combine design, automation, and AI to create modern,
                scroll-animated websites, internal tools, and full AI-driven products.
              </p>
              <div className="mt-8 flex justify-end">
                <div className="h-[1px] w-24 bg-white/20"></div>
              </div>
            </div>
          </div>

          {/* Bottom Socials */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-10 items-center opacity-40 hover:opacity-100 transition-opacity">
            <Youtube className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30">Scroll</span>
            <ChevronDown className="w-4 h-4 opacity-20 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="relative z-30 px-6 md:px-20 space-y-60 py-60 bg-black">
        
        {/* About Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group overflow-hidden rounded-3xl">
            <div 
              className="absolute -inset-10 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-[100px]"
              style={{ backgroundColor: accentColor }}
            ></div>
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              className="rounded-3xl relative grayscale group-hover:grayscale-0 transition-all duration-1000 aspect-[4/5] object-cover scale-105 group-hover:scale-100"
              alt="Mission"
            />
          </div>
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12" style={{ backgroundColor: accentColor }}></div>
              <span className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: accentColor }}>The Mission</span>
            </div>
            <h3 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase">
              Shaping the<br />Future of<br />AI Creation
            </h3>
            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
              ObaidCommunity is a premium ecosystem where the technical barriers of the past are replaced by the creative velocity of AI. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold uppercase text-xs tracking-widest opacity-40">Learning Path</h4>
                <p className="text-sm text-zinc-300">From zero to high-end cinematic web experiences in weeks, not years.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold uppercase text-xs tracking-widest opacity-40">Community</h4>
                <p className="text-sm text-zinc-300">Join a network of global creators pushing the limits of AI automation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Learning Paths Grid */}
        <section className="space-y-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter">Learning<br />Specialties</h2>
            <p className="text-zinc-500 max-w-xs uppercase tracking-widest text-[11px] font-bold leading-relaxed border-l border-white/10 pl-6">
              Pick your specialty and master the tools that define the next decade of the web.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEARNING_PATHS.map((path) => (
              <div key={path.id} className="group relative bg-zinc-900/20 hover:bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-orange-500/20 transition-all duration-500">
                <div className="mb-8 overflow-hidden rounded-2xl aspect-video relative">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                   <img src={path.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={path.title} />
                </div>
                <span className="text-[10px] font-mono opacity-30 mb-4 block">{path.index}</span>
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight leading-none">{path.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">{path.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Frequently Asked</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter">Common Queries</h2>
          </div>
          <div className="space-y-2">
            <FaqItem question="Do I need coding skills?" answer="Absolutely not. We focus on AI-assisted development and no-code tools where natural language is your primary syntax." />
            <FaqItem question="What is vibecoding?" answer="Vibecoding is the state where you describe the outcome you want to an AI, and it handles the technical implementation, allowing you to focus on the 'vibe' and user experience." />
            <FaqItem question="Can beginners join?" answer="Yes. We have structured paths for hobbyists, founders, and professionals looking to level up their digital toolkit." />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-40 relative overflow-hidden rounded-[5rem] bg-zinc-900/20 border border-white/5">
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: `radial-gradient(circle at center, ${accentColor}, transparent 80%)` }}
          ></div>
          <h2 className="text-6xl md:text-[12rem] font-black uppercase mb-16 tracking-tighter leading-[0.8]">
            Built with<br /><span style={{ color: accentColor }}>Purpose.</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-10">
            <button 
              className="px-16 py-6 rounded-full font-black text-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,94,0,0.3)]"
              style={{ backgroundColor: accentColor }}
            >
              Join the Community
            </button>
            <button className="px-16 py-6 rounded-full font-black text-white border border-white/10 hover:bg-white/5 transition-all text-xs uppercase tracking-[0.2em]">
              Explore Paths
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2 space-y-8">
            <span className="text-4xl font-black tracking-tighter">OBAID.</span>
            <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold leading-loose max-w-sm">
              Empowering a new generation of creators to build the impossible using the power of Artificial Intelligence.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-400">
            <span className="text-white/20 mb-4">Navigation</span>
            <a href="#" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Learning Paths</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Community</a>
            <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
          </div>
          <div className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-400">
            <span className="text-white/20 mb-4">Connect</span>
            {SOCIAL_ICONS.map(s => (
              <a key={s.name} href={s.url} className="hover:text-orange-500 transition-colors">{s.name}</a>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-zinc-700 uppercase tracking-[0.4em]">© {new Date().getFullYear()} OBAIDNOCODE COMMUNITY.</p>
          <div className="flex gap-10 text-[9px] font-bold uppercase tracking-widest text-zinc-700">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-10 flex justify-between items-center text-left group"
      >
        <span className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-orange-500' : 'text-white'}`}>{question}</span>
        <div className={`p-2 rounded-full border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <Plus className="w-4 h-4" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-zinc-400 font-normal leading-relaxed text-base max-w-2xl">{answer}</p>
      </div>
    </div>
  );
};

export default App;
