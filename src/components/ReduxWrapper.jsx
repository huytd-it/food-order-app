import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ReduxWrapper = ({ children }) => {
  const [isReduxReady, setIsReduxReady] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState) {
      setIsReduxReady(true);
    }
  }, [authState]);

  if (!isReduxReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return children;
};

export default ReduxWrapper; 