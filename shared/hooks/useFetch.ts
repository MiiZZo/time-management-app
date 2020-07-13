import { useState, useEffect } from "react";
import { request } from '../lib/request';

interface RequestData {
  url: string,
  body: any
}

export const useFetch = (requestData: RequestData) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<null | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request();
    };
  }, []);

  return { error, isLoading, data };
};
