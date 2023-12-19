'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

interface UserFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  telephone: string;
  manager?: string;
  status?: string;
}
interface Props {
  user?: User;
}
const UserForm = ({ user }: Props) => {
  const { register, handleSubmit } = useForm<UserFormData>();
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="max-w-md mx-auto my-2 p-6">
      {error && <p className="bg-orange-500 text-white">{error}</p>}
      <form
        className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md"
        onSubmit={handleSubmit(async (data) => {
          try {
            if (user) await axios.patch(`/api/dashboard/user/${user.id}`, data);
            else await axios.post('/api/dashboard/user', data);
            router.push('/');
            router.refresh();
          } catch (error) {
            setError('Unexpected error occurs');
          }
        })}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border p-2 rounded"
            placeholder="Enter UserName"
            defaultValue={user?.name}
            {...register('name')}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="surname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Surname
          </label>
          <input
            type="text"
            id="surname"
            className="w-full border p-2 rounded"
            placeholder="Enter Surname"
            defaultValue={user?.surname}
            {...register('surname')}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="text"
            id="surname"
            className="w-full border p-2 rounded"
            placeholder="Email"
            defaultValue={user?.email}
            {...register('email')}
          />
        </div>
        {!user && (
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              className="w-full border p-2 rounded"
              placeholder="Enter Password"
              {...register('password')}
            />
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="telephone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Telephone:
          </label>
          <input
            type="text"
            id="surname"
            className="w-full border p-2 rounded"
            placeholder="Telephone"
            defaultValue={user?.telephone}
            {...register('telephone')}
          />
        </div>
        {user && (
          <>
            <div className="mb-4">
              <label
                htmlFor="manager"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Manager
              </label>
              <select
                id="status"
                className="w-full border p-2 rounded"
                defaultValue={user.manager || ''}
                {...register('manager')}
              >
                <option value="Manager1">Manager1</option>
                <option value="Manager2">Manager2</option>
              </select>
            </div>
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
                defaultValue={user.status || ''}
                {...register('status')}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </>
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

export default UserForm;
