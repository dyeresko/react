import '@components/About/About.css';
import { Link, useNavigate } from 'react-router-dom';
import { authorInfo } from '@/data/data';
import type { FC } from 'react';
const About: FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  return (
    <div data-testid="author-info" className="author-info">
      <button onClick={handleBackClick}>Back</button>
      <p>{authorInfo}</p>
      <Link to={'https://rs.school/'}>
        <h2>RS-School link</h2>
      </Link>
    </div>
  );
};

export default About;
