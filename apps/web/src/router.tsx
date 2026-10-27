import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { About, NotFound, SectionView, Shell } from "./shell.tsx";

// Each route is an open path of panes: / (sections), /rules (+ its list), /rules/borders (+ that rule).
const root = createRootRoute({ component: Shell, notFoundComponent: NotFound });
const at = (path: string, component: () => React.ReactNode) =>
  createRoute({ getParentRoute: () => root, path, component });

export const router = createRouter({
  routeTree: root.addChildren([at("/", About), at("/$section", SectionView), at("/$section/$", SectionView)]),
});
