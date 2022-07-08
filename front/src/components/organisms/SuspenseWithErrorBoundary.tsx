import React, { ReactElement, Suspense } from 'react';
import Spinner from '../atoms/Spinner';
import ErrorBoundary from './ErrorBoundary';

const SuspenseWithErrorBoundary = ({
  children,
  errorKey,
  isRefresh,
  onReset,
  errorMessgae,
  loadingfallback,
  errorfallback,
}: {
  children: ReactElement;
  errorKey?: string | number;
  isRefresh?: boolean;
  onReset?: () => void;
  errorMessgae?: string;
  loadingfallback?: ReactElement;
  errorfallback?: React.ElementType;
}) => {
  return (
    <ErrorBoundary
      isRefresh={isRefresh}
      onReset={onReset}
      fallback={errorfallback}
      message={errorMessgae}
    >
      <Suspense fallback={loadingfallback ?? <Spinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseWithErrorBoundary;
