import React, { createContext, FC, ReactNode, useContext } from "react";
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";

export interface FullscreenProviderProps {
  children: ReactNode;
}

type ContextProps = {
  handle: FullScreenHandle;
};

const FullscreenContext = createContext<ContextProps | null>(null);

export const useFullScreen = () => useContext(FullscreenContext);

const FullscreenProvider: FC<FullscreenProviderProps> = ({ children }) => {
  const handle = useFullScreenHandle();

  return (
    <FullscreenContext.Provider value={{ handle }}>
      <FullScreen handle={handle}>{children}</FullScreen>
    </FullscreenContext.Provider>
  );
};

export default FullscreenProvider;
