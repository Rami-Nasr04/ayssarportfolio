import { createContext, useContext } from "react";

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setTimeOfLastClick: (time: number) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: "Home",
  setActiveSection: () => {},
  setTimeOfLastClick: () => {},
});

export function useActiveSectionContext() {
  return useContext(ActiveSectionContext);
}

export default ActiveSectionContext;
