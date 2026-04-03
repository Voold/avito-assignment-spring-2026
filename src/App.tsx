import { Route, Routes, Navigate } from "react-router-dom";
import { AdsPage } from "./pages/AdsPage";
import { AppShell } from "@mantine/core";
import ProductPage from "./pages/ProductPage";
import { EditProductPage } from "./pages/EditProductPage";

function App() {
  return (
    <AppShell padding="md">
      <Routes>
        <Route path="/" element={<Navigate to="/ads" replace />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<ProductPage />} />
        <Route path="/ads/:id/edit" element={<EditProductPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
