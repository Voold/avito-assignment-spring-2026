import { Route, Routes } from "react-router-dom";
import { AdsPage } from "./pages/AdsPage";
import { AppShell } from "@mantine/core";

function App() {
  return (
    <AppShell bg="#f7f5f8" padding="md" h="100vh">
      <Routes>
        <Route path="/" element={<AdsPage></AdsPage>}>
          <Route path="/ads" element={<AdsPage />}>
            <Route path=":tabNumber?" element={<AdsPage />} />
          </Route>
          <Route path="/completed" element={12}>
            <Route path=":tabNumber?" element={12} />
          </Route>
        </Route>
      </Routes>
    </AppShell>
  );
}

export default App;
