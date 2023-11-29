import React, { useEffect, useState, useMemo } from 'react';

export default function useFetchData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://6567770364fcff8d73106d0b.mockapi.io/api/v1/content-magament"
      );
      const data = await response.json();
      setData(data);
    } finally {
      setLoading(false);
    }
  };

  // Memoize the fetchData function
  const memoizedFetchData = useMemo(() => fetchData, []);

  // Fetch data only when the component mounts
  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  return { loading, data };
}
