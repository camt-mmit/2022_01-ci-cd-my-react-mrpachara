import { useEffect, useState } from 'react';

type DataType = (number | string)[] | null;

export default function MyTest() {
  const [data, setData] = useState<DataType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:8080/data');
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const items: DataType = (await res.json())['data'];

        setData(items);
        setError(null);
      } catch (excp: unknown) {
        setData(null);
        if (excp instanceof Error) {
          setError(excp.message);
        } else {
          setError(`${excp}`);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && <div>{`${error}`}</div>}
      {data && <div>{data.join(', ')}</div>}
    </div>
  );
}
