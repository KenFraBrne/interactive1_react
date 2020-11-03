/**
 * Hook for getting the current viewport width ( adapted from https://stackoverflow.com/a/36862446 )
 */
import { useState, useEffect } from 'react';

/* get current viewport width */
function getWidth(): number {
  const { innerWidth: width } = window;
  return width;
}

/* define hook */
export default function useWidth() {

  /* define width state */
  const [ width, setWidth ] = useState(getWidth());

  useEffect(() => {

    /* change width on resize */
    function handleResize() {
      setWidth(getWidth());
    }

    /* add event listener */
    window.addEventListener('resize', handleResize);

    /* and remove it on unmount */
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
