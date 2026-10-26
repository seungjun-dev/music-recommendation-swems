import RichText from "@/components/atoms/RichText";
import SoftButton from "@/components/atoms/SoftButton";
import HeroStill from "@/components/molecules/HeroStill";
import { HERO } from "@/constants/content";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="room-hero">
      <div className="hero-text">
        <p className="eyebrow">{HERO.eyebrow} <span>{HERO.volume}</span></p>
        <h1><RichText segments={HERO.title} /></h1>
        <p className="sub"><RichText segments={HERO.sub} /></p>
        <SoftButton href={HERO.cta.href} label={HERO.cta.label} icon={HERO.cta.icon} />
        <div className="hand-note"><RichText segments={HERO.handNote} /></div>
      </div>
      <HeroStill caption={HERO.caption} />
    </section>
  );
}
