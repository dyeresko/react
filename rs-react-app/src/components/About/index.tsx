import '@components/About/About.css';
import Link from 'next/link';
import { authorInfo } from '@/data/data';
import type { FC } from 'react';
const About: FC = () => {
  return (
    <div data-testid="author-info">
      <p>{authorInfo}</p>
      <Link href={'https://rs.school/'}>
        <h2>RS-School link</h2>
      </Link>
    </div>
  );
};

export default About;
