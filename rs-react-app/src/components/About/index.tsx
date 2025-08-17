import '@components/About/About.css';
import type { FC } from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
const About: FC = () => {
  const t = useTranslations('About');
  return (
    <div data-testid="author-info">
      <p>{t('info')}</p>
      <Link href={'https://rs.school/'}>
        <h2>{t('link')}</h2>
      </Link>
    </div>
  );
};

export default About;
