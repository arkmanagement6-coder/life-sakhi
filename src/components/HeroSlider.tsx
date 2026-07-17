import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, HeartHandshake, UserPlus, Info } from 'lucide-react';
import { useLang } from '../context/LangContext';

interface Slide {
  id: number;
  image: string;
  titleKey: string;
  textKey: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  icon: 'register' | 'donate' | 'volunteer' | 'learn';
}

const HeroSlider: React.FC = () => {
  const { t } = useLang();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      image: "/assets/slide_women_health.png",
      titleKey: "slider1Title",
      textKey: "slider1Text",
      ctaPrimaryText: "Register Now",
      ctaPrimaryLink: "/register?role=women_distributor",
      ctaSecondaryText: "Know More",
      ctaSecondaryLink: "/health#life-sakhi",
      icon: 'register'
    },
    {
      id: 2,
      image: "/assets/slide_education.png",
      titleKey: "slider2Title",
      textKey: "slider2Text",
      ctaPrimaryText: "Sponsor Education",
      ctaPrimaryLink: "/donate?program=education",
      ctaSecondaryText: "Our Programs",
      ctaSecondaryLink: "/education",
      icon: 'donate'
    },
    {
      id: 3,
      image: "/assets/slide_healthcare.png",
      titleKey: "slider3Title",
      textKey: "slider3Text",
      ctaPrimaryText: "Support Healthcare",
      ctaPrimaryLink: "/donate?program=healthcare",
      ctaSecondaryText: "View Medical Camps",
      ctaSecondaryLink: "/health#camps",
      icon: 'learn'
    },
    {
      id: 4,
      image: "/assets/slide_women_employment.png",
      titleKey: "slider4Title",
      textKey: "slider4Text",
      ctaPrimaryText: "Become Partner",
      ctaPrimaryLink: "/contact?type=partner",
      ctaSecondaryText: "Livelihood Programs",
      ctaSecondaryLink: "/employment",
      icon: 'volunteer'
    },
    {
      id: 5,
      image: "/assets/slide_life_sakhi.png",
      titleKey: "slider5Title",
      textKey: "slider5Text",
      ctaPrimaryText: "Become Volunteer",
      ctaPrimaryLink: "/contact?type=volunteer",
      ctaSecondaryText: "Life Sakhi Campaign",
      ctaSecondaryLink: "/women-empowerment",
      icon: 'register'
    }
  ];

  // Auto transition every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'register': return <UserPlus size={16} />;
      case 'donate': return <Heart size={16} fill="white" />;
      case 'volunteer': return <HeartHandshake size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className="hero-slider-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img
            src={slide.image}
            alt={t(slide.titleKey)}
            className="slide-bg-img"
            onError={(e) => {
              // Fallback image using gradients if image not loaded yet
              (e.target as HTMLImageElement).src = `https://placehold.co/1920x1080/0a3c8c/ffffff?text=${encodeURIComponent(t(slide.titleKey))}`;
            }}
          />
          <div className="slide-overlay">
            <div className="container">
              <div className="slide-content">
                <h1 className="slide-heading">{t(slide.titleKey)}</h1>
                <p className="slide-text">{t(slide.textKey)}</p>
                <div className="slide-actions">
                  <Link to={slide.ctaPrimaryLink} className="btn btn-secondary">
                    {getIcon(slide.icon)}
                    <span>{slide.ctaPrimaryText}</span>
                  </Link>
                  <Link to={slide.ctaSecondaryLink} className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)' }}>
                    <span>{slide.ctaSecondaryText}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Slider Navigation Arrows */}
      <div className="slider-arrows">
        <button onClick={prevSlide} className="slider-arrow" aria-label="Previous Slide">
          <ArrowLeft size={20} />
        </button>
        <button onClick={nextSlide} className="slider-arrow" aria-label="Next Slide">
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Slider Indicators (Dots) */}
      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
