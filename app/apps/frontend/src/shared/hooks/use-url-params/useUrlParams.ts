import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParam = useMemo(() => (key: string): string | undefined => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(key) ?? "";
  }, [location.search]);

  const setQueryParam = async (key: string, value: string): Promise<void> => {
    const searchParams = new URLSearchParams(location.search);
    if (!value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    const queryString = searchParams.toString();
    await navigate(`${location.pathname}?${queryString}`, { replace: true });
  };

  const removeQueryParam = (key: string): void => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    const queryString = searchParams.toString();
    navigate(`${location.pathname}?${queryString}`, { replace: true });
  };

  return { removeQueryParam, setQueryParam, getQueryParam };
};
