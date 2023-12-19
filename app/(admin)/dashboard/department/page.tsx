import React from 'react';
import AddButton from './_components/AddButton';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import prisma from '@/prisma/client';
import Link from 'next/link';

const DepartmentList = async () => {
  const departments = await prisma.department.findMany();
  return (
    <div>
      <AddButton />
      <div className="mt-2 border-t-2 max-w-4xl">
        <Table>
          <TableCaption>Departmet List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Manager Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">
                  {department.depname}
                </TableCell>
                <TableCell>{department.managername}</TableCell>
                <TableCell>{department.status}</TableCell>
                <TableCell className="flex gap-3 items-center justify-end">
                  <Button variant="outline">
                    <Link href={`/dashboard/department/${department.id}`}>
                      Update
                    </Link>
                  </Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentList;
