'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Department } from '@prisma/client';

interface DepartmentFormData {
  depname: string;
  managername: string;
  status?: string;
}
interface Props {
  department?: Department;
}
const DepartmentForm = ({ department }: Props) => {
  const { register, handleSubmit, control } = useForm<DepartmentFormData>();
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="max-w-md mx-auto my-2 p-6">
      {error && <p className="bg-orange-500 text-white">{error}</p>}
      <form
        className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md"
        onSubmit={handleSubmit(async (data) => {
          try {
            if (department)
              await axios.patch(
                `/api/dashboard/department/${department.id}`,
                data
              );
            else await axios.post('/api/dashboard/department', data);
            router.push('/');
            router.refresh();
          } catch (error) {
            setError('Unexpected error occurs');
          }
        })}
      >
        <div className="mb-4">
          <label
            htmlFor="departmentName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Department Name
          </label>
          <input
            type="text"
            id="departmentName"
            className="w-full border p-2 rounded"
            placeholder="Enter Department Name"
            defaultValue={department?.depname}
            {...register('depname')}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="managerName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Manager Name
          </label>
          <input
            type="text"
            id="managerName"
            className="w-full border p-2 rounded"
            placeholder="Enter Manager Name"
            defaultValue={department?.managername}
            {...register('managername')}
          />
        </div>
        {department && (
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Status
            </label>
            <select
              id="status"
              className="w-full border p-2 rounded"
              defaultValue={department.status}
              {...register('status')}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
