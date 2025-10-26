import classes from './Hero.module.css';
import Image from 'next/image';
import wave from '@/public/icon_wave-removebg-preview.png';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.heading}>Pomoz nám tvořit budoucnost chytrého učení!</h2>
      <button
        className={classes.cto}
        onClick={() => scrollToSection('about-us')}
      >
        CHCI BÝT SOUČASTÍ
      </button>
      <Image src={wave} alt='Waving memo' />
    </div>
  );
};

export default Hero;