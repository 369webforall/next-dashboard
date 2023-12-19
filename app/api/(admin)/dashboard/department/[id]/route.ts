import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

const createDepartmentSchema = z.object({
  depname: z.string().min(1, 'Department name is required'),
  managername: z.string().min(1, 'Manager name is required'),
  status: z.optional(z.string().min(1, 'Status is requrired')),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = createDepartmentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const department = await prisma.department.findUnique({
    where: { id: params.id },
  });
  if (!department)
    return NextResponse.json(
      { message: 'No Department found' },
      { status: 401 }
    );

  const updateDeparment = await prisma.department.update({
    where: { id: department.id },
    data: {
      depname: body.depname,
      managername: body.managername,
      status: body.status,
    },
  });
  return NextResponse.json(updateDeparment, { status: 201 });
}
