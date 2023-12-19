import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

const createUserSchema = z.object({
  name: z.string().min(1, 'User name is required'),
  surname: z.string().min(1, 'surname name is required'),
  email: z.string().email('Email is required'),
  password: z.string().min(1, 'Password is required'),
  telephone: z.string().min(1, 'Telephone number is required'),
  manager: z.optional(z.string().min(1, 'Manager  is requrired')),
  status: z.optional(z.string().min(1, 'Status is requrired')),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: body.password,
      telephone: body.telephone,
      manager: body.manager,
      status: body.status,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
