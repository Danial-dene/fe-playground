import { useRouter } from "next/router";
import React, {
  ReactNode,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";

export interface HeaderProviderProps {
  title: string | JSX.Element;
  setTitle: (title: string | JSX.Element | React.ReactNode) => void;
  // breadcrumb: HeaderBreadCrumbProps[];
  // setBreadcrumb: (items: HeaderBreadCrumbProps[]) => void;
}

export type HeaderBreadCrumbProps = {
  to?: string;
  label: string;
};

const HeaderContext = createContext<HeaderProviderProps>({
  title: "",
  // breadcrumb: [],
  setTitle: () => {},
  // setBreadcrumb: () => {},
});

const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  // const [breadcrumb, setBreadcrumb] = useState<HeaderBreadCrumbProps[]>([]);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  useEffect(() => {
    const handleRouteChange = () => {
      // setTitle("");
    };
    router.events.on("routeChangeStart", handleRouteChange);
    // setBreadcrumb([]);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const value = { title, setTitle };

  return (
    <HeaderContext.Provider
      //@ts-ignore
      value={value}
    >
      {children}
    </HeaderContext.Provider>
  );
};

const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};

export { useHeader };
export default HeaderProvider;
