import type { Config } from "tailwindcss";

import { ComponentsContentPath } from "@yext/search-ui-react"; 

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    ComponentsContentPath
  ],
  theme: {
    extend: {
      colors: {
        orange: "#ff9500",
        "dark-orange": "#db8000",
      },
      scale: {
        1.02: "1.02",
      },
    },
  },
  plugins: [],
} satisfies Config;
