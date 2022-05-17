import { useSelector } from "react-redux";
import { useMemo } from "react";
import defaultConfig from "../config.json";
import { deepmerge } from "@mui/utils";

export const useWebsiteConfig = () => {
  const { website } = useSelector((state) => state.website);
  return useMemo(() => {
    return deepmerge(defaultConfig || {}, website?.config || {});
  }, [website]);
};
