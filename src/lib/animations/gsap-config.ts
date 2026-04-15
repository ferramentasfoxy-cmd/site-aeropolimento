import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initHeroReveal = () => {
  // Safe check for window
  if (typeof window === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    defaults: { 
      ease: 'power3.out',
      duration: 0.8 
    }
  });

  // Sequência de entrada com checagem para ver se os elementos existem
  if (document.querySelector('.hero-badge')) {
    tl.fromTo('.hero-badge', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
  }
  
  if (document.querySelector('.hero-headline')) {
    tl.fromTo('.hero-headline', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }, 
      '-=0.3'
    );
  }
  
  if (document.querySelector('.hero-subheadline')) {
    tl.fromTo('.hero-subheadline', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 }, 
      '-=0.6'
    );
  }

  if (document.querySelector('.hero-cta-primary') || document.querySelector('.hero-cta-secondary')) {
    tl.fromTo(['.hero-cta-primary', '.hero-cta-secondary'], 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, 
      '-=0.5'
    );
  }

  if (document.querySelector('.hero-trust-item')) {
    tl.fromTo('.hero-trust-item', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 
      '-=0.4'
    );
  }

  if (document.querySelector('.hero-product-container')) {
    tl.fromTo('.hero-product-container', 
      { opacity: 0, scale: 0.9, x: 60 },
      { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: 'elastic.out(1, 0.75)' }, 
      '-=1.6'
    );
  }

  if (document.querySelector('.scroll-indicator')) {
    tl.fromTo('.scroll-indicator', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0 }, 
      '-=0.5'
    );
  }

  // Efeito Parallax sutil ao scrollar
  if (document.querySelector('.hero-product-container')) {
    gsap.to('.hero-product-container', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-container-main',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  return tl;
};
