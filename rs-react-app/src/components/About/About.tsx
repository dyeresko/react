import './About.css';
import { Link, useNavigate } from 'react-router-dom';
function About() {
  const navigate = useNavigate();
  const authorInfo =
    'My name is Denis Yeresko and I am a beginner developer focused on the frontend. My goal is to become a highly qualified web development specialist and continue to develop my knowledge and skills in programming.\n' +
    '\n' +
    'I entered the university, where I studied for two years, but at some point I realized that I needed more practice and real projects. I decided to take an academic leave and focus on self-development.\n' +
    '\n' +
    'Over time, I realized that I was attracted to frontend development, and I decided to focus on this direction. I enrolled in the JavaScript course from RS School. I wanted to expand my horizons and learn how to work with modern frontend technologies.\n' +
    '\n' +
    'The learning process at RS School was a real discovery for me. I began to better understand how the interaction between the user and the web application is built.\n' +
    '\n' +
    'One of my main motivations is the opportunity to solve complex problems and create solutions that make web applications more convenient and functional for users. I always enjoy solving logical problems and encounter them at every stage of development. The complexity of the tasks does not scare me, on the contrary, it motivates me to delve deeper into the problem and find the most elegant solution. I strive to develop this quality in the future in order to effectively solve the problems I encounter at work.';
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
