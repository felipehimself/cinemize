import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { IoMoon, IoSunny } from 'react-icons/io5';

const ColorMode = ({size, className}:{size:number, className?:string}) :JSX.Element=> {
  const [mount, setMount] = useState(false);

  const { theme, systemTheme, setTheme } = useTheme();

  const currentTheme = theme == 'system' ? systemTheme : theme;

  

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <button
      onClick={() =>
        !mount
          ? null
          : currentTheme === 'dark'
          ? setTheme('light')
          : setTheme('dark')
      }
    >
      {!mount ? null : currentTheme === 'dark' ? <IoSunny size={size}/> : <IoMoon className={`${className}`} size={size}/>}
    </button>
  );
};
export default ColorMode;
