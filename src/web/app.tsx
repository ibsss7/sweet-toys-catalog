import { Route, Switch } from "wouter";
import CatalogPage from "./pages/CatalogPage";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={CatalogPage} />
    </Switch>
  );
}
