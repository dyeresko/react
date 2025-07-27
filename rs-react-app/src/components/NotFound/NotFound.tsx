import './NotFound.css';
import { useNavigate } from 'react-router-dom';
function About() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="error-not-found">
        <h2>NOT FOUND 404</h2>
      </div>
    </div>
  );
}

export default About;
