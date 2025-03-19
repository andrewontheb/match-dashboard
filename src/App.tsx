import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { MatchList } from './components/MatchList'
import './App.scss'

function App() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              Ошибка: {error.message}
              <br />
              <button onClick={() => resetErrorBoundary()}>Повторить</button>
            </div>
          )}
        >
          <Suspense fallback={<div>Загрузка...</div>}>
            <MatchList />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App
