import React, { useRef } from 'react'
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query'
import { ApiResponse } from '../types'

interface HeadRowProps {
  handleRefresh: (options?: RefetchOptions) => Promise<QueryObserverResult<ApiResponse, Error>>;
  isApiError: boolean;
}

export function HeadRow({ handleRefresh, isApiError }: HeadRowProps): React.ReactElement {
  const spinnerRef = useRef<HTMLImageElement | null>(null);

  const handleButtonClick = async () => {
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
    }
  };

  return <div className='flex justify-between items-center'>
    <p className='main-title text-3xl font-normal'>Match Tracker</p>
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
        className='btn-update flex items-center justify-center'
      >
        Обновить
        <img
          ref={spinnerRef}
          src='src/assets/imgs/loader.svg'
          alt='spinner'
          className={`ml-4 `}
        />
      </button>
    </div>
  </div >
}