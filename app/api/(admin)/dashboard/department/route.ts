import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

const createDepartmentSchema = z.object({
  depname: z.string().min(1, 'Department name is required'),
  managername: z.string().min(1, 'Manager name is required'),
  status: z.optional(z.string().min(1, 'Status is requrired')),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createDepartmentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newDepartment = await prisma.department.create({
    data: {
      depname: body.depname,
      managername: body.managername,
    },
  });
  return NextResponse.json(newDepartment, { status: 201 });
}
