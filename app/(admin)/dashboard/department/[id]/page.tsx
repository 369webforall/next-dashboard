import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import DepartmentForm from '../_components/DepartmentForm';
const DepartmentUpdate = async ({ params }: { params: { id: string } }) => {
  const department = await prisma.department.findUnique({
    where: { id: params.id },
  });
  if (!department) notFound();

  return (
    <div>
      <DepartmentForm department={department} />
    </div>
  );
};

export default DepartmentUpdate;
