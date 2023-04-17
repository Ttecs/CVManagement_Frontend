import { createContext, useState } from "react";

interface IThemeContext {
  darkMode: boolean;
  toogleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  darkMode: false,
  toogleDarkMode: () => {},
});

interface IthemeContextProps {
  children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: IthemeContextProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toogleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <ThemeContext.Provider value={{ darkMode, toogleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
