import SocketContextProvider from "@/contexts/socketio";
import { PortfolioDataProvider } from "@/contexts/portfolio-data";
import Preloader from "./preloader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <PortfolioDataProvider>
        <Preloader>
          <SocketContextProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster />
          </SocketContextProvider>
        </Preloader>
      </PortfolioDataProvider>
    </ThemeProvider>
  );
};
