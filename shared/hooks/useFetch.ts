import { useState, useEffect } from "react";
import { request } from "../lib/request";

interface RequestData {
  url: string;
  body: any;
}

export const useFetch = (requestData: RequestData) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const { url, body } = requestData;

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching) {
        try {
          setIsLoading(true);
          const data = await request(url, "POST", body);
          setData(data);
        } catch (e) {
          setError(e);
        } finally {
          setIsLoading(false);
          setIsFetching(false);
        }
      }
    };

    fetchData();
  }, []);

  return { error, isLoading, data, setIsFetching };
};
