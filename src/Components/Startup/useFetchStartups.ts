import { useEffect, useState } from 'react';
import { StartupHttpService } from '../../Http/Startup/Startup.http.service';
import { Startup } from '../../Types/Startup';

export const useFetchStartups = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StartupHttpService.getAllStartup();
        setStartups(data);
        setLoading(false);
      } catch (err) {
        const message = (err as Error).message;
        setError(message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { startups, loading, error };
};
