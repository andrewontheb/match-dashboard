import React, { useRef, useState } from 'react'
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query'
import { ApiResponse } from '../types'

interface HeadRowProps {
  filterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRefresh: (options?: RefetchOptions) => Promise<QueryObserverResult<ApiResponse, Error>>;
  isApiError: boolean;
}

const CustomSelect: React.FC<{ filterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ filterChange }) => {
  return (
    <div className="relative">
      <select onChange={filterChange} className="maшtch-status__filter w-[170px] block appearance-none border border-transparent rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500">
        <option value="All">Все статусы</option>
        <option value="Ongoing">Live</option>
        <option value="Finished">Finished</option>
        <option value="Scheduled">Scheduled</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export function HeadRow({ handleRefresh, filterChange, isApiError }: HeadRowProps): React.ReactElement {
  const spinnerRef = useRef<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    if (loading) return;
    setLoading(true);
    if (spinnerRef.current) {
      spinnerRef.current.classList.add('animate-spin');
    }

    try {
      await handleRefresh();
    } finally {
      if (spinnerRef.current) {
        setTimeout(() => {
          spinnerRef.current?.classList.remove('animate-spin');
        }, 1000);
      }
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-wrap items-center'>
        <p className='main-title text-3xl font-normal mr-4'>Match Tracker</p>
        <CustomSelect filterChange={filterChange} />
      </div>

      <div className='flex items-center'>
        {isApiError &&
          <div className='flex items-center mr-4 err-block'>
            <img src='src/assets/imgs/alert.svg' alt='alert' className='m-2' />
            <p className='err-text'>
              Ошибка: не удалось загрузить информацию
            </p>
          </div>
        }

        <button
          onClick={handleButtonClick}
          disabled={loading}
          aria-label='Обновить данные'
          className='btn-update flex items-center justify-center'>
          Обновить
          <img
            ref={spinnerRef}
            src='src/assets/imgs/loader.svg'
            alt='spinner'
            className='ml-4' />
        </button>
      </div>
    </div>
  );
}