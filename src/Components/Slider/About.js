import React from 'react';
import imge1 from '../../Components/assests/Sheko.png';

const About = () => {
  const imgStyle = {
 
    height: '500px',
    objectFit: 'cover',
    objectPosition: 'center',
    marginBottom: '20px',
    marginTop: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    overflow: 'hidden'
  };

  return (
    <div className='container mt-5 mb-5 text-center'>
      <img src={imge1} alt="Sheko" style={imgStyle} />
    </div>
  );
}

export default About;
