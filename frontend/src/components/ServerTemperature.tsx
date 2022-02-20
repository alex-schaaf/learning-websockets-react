import React, { useEffect, useState } from "react";

interface TemperatureData {
  temperature: number;
  timestamp: Date;
}

const ServerTemperature: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData>();

  useEffect(() => {
    const webSocket = new WebSocket(`ws://localhost:8080`);

    webSocket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setTemperatureData({
        temperature: data.temperature,
        timestamp: new Date(data.timestamp),
      });
    };

    webSocket.onclose = () => {
      setTemperatureData(undefined);
    };
  }, []);

  if (temperatureData == undefined) {
    return (
      <div>
        <p>No steering suggestion.</p>
      </div>
    );
  }

  return (
    <div>
      <p>{temperatureData.temperature.toFixed(1)} °C</p>
      <p>{temperatureData.timestamp.toISOString()}</p>
    </div>
  );
};

export default ServerTemperature;
