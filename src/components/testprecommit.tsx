import { useEffect, useState } from 'react';

export function PreCommit() {
  const [is, setIs] = useState(false);

  useEffect(() => {
    setIs(true);
  }, []);

  return <div />;
}
