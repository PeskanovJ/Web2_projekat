import React, { useContext } from 'react';

import classes from './ProfileInfo.module.css'
import Card from '../UI/Card/Card';
import AuthContext from '../../Contexts/auth-context';

function ProfileInfo() {
  const ctx = useContext(AuthContext)
  return (
    <Card>
      <div>AAAA</div>
    </Card>
  );
}

export default ProfileInfo;