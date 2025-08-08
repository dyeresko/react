import '@components/About/About.css';
import { Link, useNavigate } from 'react-router-dom';
import { authorInfo } from '@/data/data';
function About() {
  const navigate = useNavigate();
  return (
    <div data-testid="author-info" className="author-info">
      <button onClick={() => navigate(-1)}>Back</button>
      <p>{authorInfo}</p>
      <Link to={'https://rs.school/'}>
        <h2>RS-School link</h2>
      </Link>
    </div>
  );
}

export default About;
