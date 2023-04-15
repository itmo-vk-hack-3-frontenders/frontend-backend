// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HomePage } from "../pages/HomePage";
import "./index.scss";
import { AppRouterProvider } from "./providers/AppRouterProvider";

export function App() {
  return (
    <AppRouterProvider />
  );
}

export default App;
