import { Button } from '@/components/atoms';
import React, {
  ReactNode,
  ComponentProps,
  CSSProperties,
  useState,
} from 'react';
import ErrorBoundary from '../ErrorBoundary';

// const CustomErrorBoundary = ({
//   // error,
//   fallback,
//   isFresh,
//   message,
//   children,
// }: {
//   // error: Error;
//   fallback: ReactElement;
//   isFresh?: boolean;
//   message?: string;
//   children?: ReactNode;
// }) => {
//   // console.log(error);
//   return (
//     // <ErrorBoundary
//     //   fallback={fallback}
//     //   // resetKeys={[refresh]}
//     //   // onError={(error, info) => {
//     //   //   isRefresh && setRefresh(true);
//     //   //   onError && onError(error, info);
//     //   // }}
//     //   // {...errorBoundaryProps}
//     // >
//     //   {children}
//     //   {/* {!isFresh ? (
//     //     children
//     //   ) : (
//     //     <Button type={ButtonType.ERROR} size={SizeType.LARGE}>
//     //       <Icon icon={<HiOutlineRefresh />} /> 새로고침
//     //     </Button>
//     //   )} */}
//     // </ErrorBoundary>
//   );
// };

// export default CustomErrorBoundary;

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface Props extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  fallback?: ErrorBoundaryProps['fallback'];
  isRefresh?: boolean;
  style?: CSSProperties;
  onError?: (error: Error, info: { componentStack: string }) => void;
  children?: ReactNode;
}

const RefreshButton = ({
  dispatch,
  style,
}: {
  dispatch: (flag: boolean) => void;
  style?: CSSProperties;
}): JSX.Element => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Button
        onClick={() => {
          dispatch(false);
        }}
      >
        새로고침
      </Button>
    </div>
  );
};

function CustomErrorBoundary({
  fallback,
  isRefresh,
  style,
  onError,
  children,
  ...errorBoundaryProps
}: Props): JSX.Element {
  const [refresh, setRefresh] = useState<boolean>(false);
  return (
    <ErrorBoundary
      fallback={fallback}
      resetKeys={[refresh]}
      onError={(error: Error, info: { componentStack: string }) => {
        isRefresh && setRefresh(true);
        onError?.(error, info);
      }}
      {...errorBoundaryProps}
    >
      {!refresh ? (
        children
      ) : (
        <RefreshButton dispatch={(flag) => setRefresh(flag)} style={style} />
      )}
    </ErrorBoundary>
  );
}

export default CustomErrorBoundary;
