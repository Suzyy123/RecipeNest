import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthService = () => {
  const { token, login, logout } = useContext(AuthContext);

  return (
    <div>
      {token ? "Logged In" : "Logged Out"}
    </div>
  );
};
