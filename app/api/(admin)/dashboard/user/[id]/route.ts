import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

const createUserSchema = z.object({
  name: z.string().min(1, 'User name is required'),
  surname: z.string().min(1, 'surname name is required'),
  email: z.string().email('Email is required'),
  telephone: z.string().min(1, 'Telephone number is required'),
  manager: z.optional(z.string().min(1, 'Manager  is requrired')),
  status: z.optional(z.string().min(1, 'Status is requrired')),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user)
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  console.log(body);
  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      surname: body.surname,
      email: body.email,
      telephone: body.telephone,
      manager: body.manager,
      status: body.status,
    },
  });
  return NextResponse.json(updateUser, { status: 201 });
}
