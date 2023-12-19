import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import UserForm from '../_components/UserForm';
const UserUpdate = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user) notFound();

  return (
    <div>
      <UserForm user={user} />
    </div>
  );
};

export default UserUpdate;
