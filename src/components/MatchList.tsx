import { useSuspenseQuery } from '@tanstack/react-query'
import { ApiResponse, Match as MatchProps} from '../types'
import { fetchTodos } from '../api'
import { Match } from './Match'
import { HeadRow } from './HeadRow'

export function MatchList(): React.ReactElement {
    const { data, refetch, isError } = useSuspenseQuery<ApiResponse>({
      queryKey: ["data"],
      queryFn: fetchTodos,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5
    });
  
    return (
      <>
        <div className='flex flex-col match-list gap-3 p-6'>
          <HeadRow handleRefresh={refetch} isApiError={isError}/>
          {data.data.matches.map((item: MatchProps, index: number) => {
            return <Match key={index} {...item} />
          })}
        </div>
      </>
    );
  }