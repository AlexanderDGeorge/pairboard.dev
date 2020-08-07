import "styled-components";

declare module "styled-components" {
    export interface Theme {
        black: string;
        verydark: string;
        dark: string;
        medium: string;
        accent: string;
        light: string;
        verylight: string;
        white: string;
        darkblue?: string;
        blue?: string;
        lightblue?: string;
        darkorange?: string;
        orange?: string;
        lightorange?: string;
    }
}
