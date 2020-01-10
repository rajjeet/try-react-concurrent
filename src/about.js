import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

export const About = ({ text }) => {
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false)
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return loading ? <HashLoader size={50} /> : <h1>{text}</h1>;
};
