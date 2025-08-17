'use client';
import '@components/About/About.css';
import type { FC } from 'react';
import BackButton from '@/components/BackButton';
import About from '@/components/About';
const AboutPage: FC = () => {
  return (
    <div className="author-info">
      <BackButton />
      <About />
    </div>
  );
};

export default AboutPage;
