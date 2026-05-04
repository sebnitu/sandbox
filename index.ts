// @ts-ignore
import "./index.scss";
import { DrawerCollection, mediaQuery } from "vrembem";

const drawers = new DrawerCollection({
  plugins: [mediaQuery()]
});

drawers.mount();
