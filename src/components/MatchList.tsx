import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ApiResponse, Match as MatchProps, MatchStatus } from '../types'
import { fetchMatchesData } from '../api'
import { Match } from './Match'
import { HeadRow } from './HeadRow'

const WS_URL: string = 'wss://app.ftoyd.com/fronttemp-service/ws';
const INTERVAL_MS: number = 2500;

export function MatchList(): React.ReactElement {
  const [latestData, setLatestData] = useState(null);
  const [filterType, setFilterType] = useState<string>(MatchStatus.ALL);
  const lastUpdateTime = useRef(0);

  const { data, refetch, isError } = useSuspenseQuery<ApiResponse>({
    queryKey: ["data"],
    queryFn: fetchMatchesData,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  }, []);


  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeoutId: number;

    const connectWebSocket = () => {
      try {
        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
          console.log('WebSocket connection established.');
        };

        socket.onmessage = (event) => {
          try {
            const currentTime = Date.now();
            const parsedData = JSON.parse(event.data);
            if (currentTime - lastUpdateTime.current >= INTERVAL_MS) {
              setLatestData(parsedData);
              lastUpdateTime.current = currentTime;
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        socket.onclose = (event) => {
          console.warn('WebSocket connection closed. Reconnecting...', event.reason);
          reconnectTimeoutId = setTimeout(connectWebSocket, INTERVAL_MS);
        };
      } catch (error) {
        console.error("WebSocket connection failed:", error);
        reconnectTimeoutId = setTimeout(connectWebSocket, INTERVAL_MS);
      }
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
      if (reconnectTimeoutId) clearTimeout(reconnectTimeoutId);
    };
  }, []);

  return (
    <>
      <div className='flex flex-col match-list gap-3 p-6'>
        <HeadRow handleRefresh={refetch} filterChange={handleFilterChange} isApiError={isError} />
        {(latestData?.data || data.data.matches)?.map((item: MatchProps, index: number) => {
          if (filterType === MatchStatus.ALL || item.status === filterType) {
            return <Match key={index} {...item} />
          }
        })}
      </div>
    </>
  );
}