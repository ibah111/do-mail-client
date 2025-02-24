import React from 'react';
import { NotConnected } from './NotConnected';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import server from '../../utils/server';
import { useAppDispatch } from '../../Reducer';
import { resetUser } from '../../Reducer/User';
import version from '../../utils/version';
const connect = (callback: (value: boolean) => void) => {
  const socket = io(server());
  socket.on('connect', () => {
    socket.emit('version', version());
    callback(true);
  });
  socket.on('new_version', () => {
    document.location.reload();
  });
  socket.on('disconnect', () => {
    callback(false);
  });
};
interface ConnectProps {
  children: React.ReactNode;
}
export function Connect({ children }: ConnectProps) {
  const dispatch = useAppDispatch();
  const [connected, setConnected] = React.useState(false);
  React.useEffect(() => {
    connect(setConnected);
  }, []);
  React.useEffect(() => {
    if (connected === false) {
      dispatch(resetUser());
    }
  }, [connected]);
  return <>{connected ? children : <NotConnected />}</>;
}
Connect.propTypes = {
  children: PropTypes.node,
};
