import React from 'react';
import dynamic from 'next/dynamic';
const UserForm = dynamic(() => import('../_components/UserForm'));

const AddNewUser = () => {
  return (
    <div>
      <UserForm />
    </div>
  );
};

export default AddNewUser;
