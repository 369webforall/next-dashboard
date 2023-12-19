import React from 'react';
import Link from 'next/link';
const AddNewUserButton = () => {
  return (
    <div>
      <button
        type="submit"
        className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        <Link href="/dashboard/user/new">Add New User</Link>
      </button>
    </div>
  );
};

export default AddNewUserButton;
