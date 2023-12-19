import React from 'react';
import dynamic from 'next/dynamic';
const DepartmentForm = dynamic(() => import('../_components/DepartmentForm'));

const AddNewDepartment = () => {
  return (
    <div>
      <DepartmentForm />
    </div>
  );
};

export default AddNewDepartment;
