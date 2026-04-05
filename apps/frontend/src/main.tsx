import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@mantine/core/styles.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "./styles/index.css";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    Text: {
      defaultProps: {
        style: {
          textBoxTrim: "none",
          textBoxEdge: "initial",
        },
      },
    },
    Badge: {
      styles: {
        label: {
          textBoxTrim: "none",
          textBoxEdge: "initial",
          overflow: "visible",
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // чтобы не дергать бэк при каждом переключении вкладок
      retry: 1, // количество попыток при ошибке
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <App />
        <Notifications position="top-right" w={300} limit={2} />
      </MantineProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
