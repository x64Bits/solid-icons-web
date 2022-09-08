import { createGlobalStyles } from "solid-styled-components";
import { reset } from "./Reset";

const GlobalStyles = () => {
  const Styles = createGlobalStyles`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
    ${reset};
    
    html, body {
      font-family: 'Inter', sans-serif;
      font-style: normal;
    }

    [data-color-scheme="dark"] {
      color-scheme: dark;
    }

    [data-color-scheme="light"] {
      color-scheme: light;
    }

    @keyframes onDarkMode {
      from {
        transform: translateX(-3px);
      }

      to {
        transform: translateX(25px);
      }
    }

    @keyframes offDarkMode {
      from {
        transform: translateX(25px);
      }

      to {
        transform: translateX(-3px);
      }
    }
  `;
  return <Styles />;
};

export default GlobalStyles;
