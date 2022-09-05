import { Accessor } from "solid-js";
import "solid-styled-components";

export interface IRounded {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface IShadow {
  unfocus: string;
}

export interface IColors {
  accent: string;
  background: string;
  backgroundSecondary: string;
  button: string;
  surface: string;
  surfaceSecondary: string;
  surfaceModal: string;
  stroke: string;
  strokeAccent: string;
  textPrimary: string;
  focus: string;
  secondary: string;
  overlay: string;

  strokeFocus: string;
  surfaceFocus: string;
}

type Theme = Accessor<{
  colors: IColors;
  rounded: IRounded;
  shadow: IShadow;
}>;

declare module "solid-styled-components" {
  export interface DefaultTheme extends Theme {}
}
