import React from 'react';
import AddNewUserButton from './_components/AddNewUserButton';
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

const UserList = async () => {
  const users = await prisma.user.findMany();
  return (
    <div>
      <AddNewUserButton />
      <div className="mt-2 border-t-2 max-w-6xl">
        <Table>
          <TableCaption>User List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Telephone Number</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.surname}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.manager}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell className="flex gap-3 items-center justify-end">
                  <Button variant="outline">
                    <Link href={`/dashboard/user/${user.id}`}>Update</Link>
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

export default UserList;
