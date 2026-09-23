import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypingEffect = ({ text, speed }) => {
  const el = useRef(null);

  useEffect(() => {
    // Ensure text is either a string or an array of strings
    const formattedText = typeof text === 'string' ? [text] : text;

    const options = {
      strings: formattedText,
      typeSpeed: speed,
      backSpeed: 0,
      backDelay: 0,
      startDelay: 500,
      loop: false,
      showCursor: false,
    };

    const typed = new Typed(el.current, options);

    return () => {
      typed.destroy();
    };
  }, [text, speed]);

  return <div ref={el} className="text-gray-700 text-lg leading-relaxed"></div>;
};

export default TypingEffect;
