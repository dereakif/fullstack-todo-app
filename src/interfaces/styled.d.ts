import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      surface: string;
      primary: string;
      primaryVariant: string;
      secondaryVariant: string;
      fontColor: string;
      buttonHover: string;
    };
  }
}
