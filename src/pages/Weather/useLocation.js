import { useState } from 'react';

function useLocation() {
  const [ipInfo, setIpInfo] = useState(null);

    fetch('https://ipinfo.io/json?token=8dd3e07d895ea7')
      .then(response => response.json())
      .then(data => setIpInfo(data))
      .catch(error => console.error(error));

  return ipInfo
}

export default useLocation;