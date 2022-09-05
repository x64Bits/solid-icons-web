import { createEffect, createSignal, useContext } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { ThemeProvider } from "solid-styled-components";
import { AppContext } from "~/store/AppContext";

interface IThemeProps {
  children: JSX.Element;
}

const rounded = {
  small: "10px",
  medium: "20px",
  large: "50px",
  full: "999px",
};

const shadow = {
  unfocus: "0px 4px 4px rgba(217, 217, 217, 0.2)",
};

export const light = {
  colors: {
    accent: "#2E49A8",
    background: "#F4F8FF",
    backgroundSecondary: "#FFF",
    button: "#DCE4F7",
    surface: "#D0DAF2",
    surfaceSecondary: "#2F3E53",
    surfaceModal: "#E8EFFF",
    stroke: "#C2D1F6",
    strokeAccent: "#C2D1F6",
    textPrimary: "#00072D",
    focus: "#ECF2FF",
    secondary: "#ACACAC",
    overlay: "rgba(244, 248, 255, 0.9)",

    strokeFocus: "#C2D1F6",
    surfaceFocus: "#F8FAFF",
  },
  rounded,
  shadow,
};

export const dark = {
  colors: {
    accent: "#6083B5",
    background: "#0E192E",
    backgroundSecondary: "#0C172A",
    button: "#14223A",
    stroke: "#2F3E53",
    strokeAccent: "#6083B5",
    surface: "#0C172A",
    surfaceSecondary: "#2F3E53",
    surfaceModal: "#2C394B",
    textPrimary: "#D0D6DD",
    focus: "#2F3E53",
    secondary: "#ACACAC",
    overlay: "rgba(12, 23, 42, 0.9)",

    strokeFocus: "#C2D1F6",
    surfaceFocus: "#0C172A",
  },
  rounded,
  shadow: {
    unfocus: "0px",
  },
};

export const themes = {
  light,
  dark,
};

export default function Theme(props: IThemeProps) {
  const [theme, setTheme] = createSignal(light);
  const [state] = useContext(AppContext);

  createEffect(() => {
    console.log(state.darkMode);
    setTheme(state.darkMode ? dark : light);
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
