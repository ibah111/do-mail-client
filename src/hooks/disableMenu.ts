import React from 'react';
import { useAppDispatch } from '../Reducer';
import { setMenuVisible } from '../Reducer/Stater';

export default function disableMenu() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setMenuVisible(false));
    return () => {
      dispatch(setMenuVisible(true));
    };
  }, []);
}
