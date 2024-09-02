import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getApiById } from "../services/axiosInterceptors";

const useDataFetchingForBothApis = (route) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const and = location.search.split("&");
        const id = and[0].split("=")[1];
        const pending = and[1]?.includes("pending");

        const response = pending
          ? await getApiById("pending", id)
          : await getApiById(route, id);

        setData(response.data.data.data_object || response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export { useDataFetchingForBothApis };
