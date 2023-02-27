import React from 'react';
import { NotLoged } from './NotLoged';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthUserSuccess } from '../../Schemas/Auth';
import { useAppDispatch, useAppSelector } from '../../Reducer';
import { setUser } from '../../Reducer/User';
import { AbilityContext } from '../../Context/Ability';
import { AppAbility, createForUser } from '../../casl/casl.factory';
import requests from '../../utils/requests';
import getToken from '../../api/getToken';
const connect = async (
  callback: (value: AuthUserSuccess) => void,
  setError: (value: string | null) => void,
) => {
  try {
    const token = await getToken();
    requests.defaults.headers['token'] = token;
    const response = await requests.post<AuthUserSuccess>('/login');
    callback(response.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const data = e.response?.data;
      if (data.Result === 'error') {
        setError(data?.Message);
      } else {
        setError(null);
      }
    }
  }
};
interface LoginProps {
  children: React.ReactNode;
}
export function Login({ children }: LoginProps) {
  const loged = useAppSelector((state) => state.User.login_result);
  const [ability, setAbility] = React.useState<AppAbility>(createForUser());
  const dispatch = useAppDispatch();
  const [message, setMessage] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!loged) {
      connect(
        (value) => {
          setAbility(createForUser(value));
          dispatch(setUser(value));
        },
        (message) => setMessage(message),
      );
    }
  }, [loged]);
  return (
    <>
      {loged ? (
        <AbilityContext.Provider value={ability}>
          {children}
        </AbilityContext.Provider>
      ) : (
        <NotLoged message={message ? message : ''} />
      )}
    </>
  );
}
Login.propTypes = {
  children: PropTypes.node,
};
