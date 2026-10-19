import { StatusMessage } from "./components/StatusMessage/StatusMessage";
import { env } from "./config/env";
import { Home } from "./pages/Home";

export function App() {
  if (!env.ok) {
    return <StatusMessage title="Setup needed">{env.error}</StatusMessage>;
  }

  return <Home />;
}
