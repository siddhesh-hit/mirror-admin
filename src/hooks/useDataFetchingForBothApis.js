import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getApiById } from "../services/axios";

const useDataFetchingForBothApis = (route) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pending = searchParams.get("pending");

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
