import { NextResponse } from "next/server";
import { updateUserRequestSchema } from "@/lib/api/contracts";
import { error, parseJsonRequest, success } from "@/lib/api/response";
import { withAppServices } from "@/lib/server/withAppServices";

type RouteContext = {
  params?: Promise<Record<string, string | string[] | undefined>>;
};

async function resolveUserId(context: RouteContext) {
  const params = (await context.params) ?? {};
  const rawId = params.id;
  return Array.isArray(rawId) ? rawId[0] : rawId;
}

export const dynamic = "force-dynamic";

export async function PUT(req: Request, context: RouteContext) {
  return withAppServices(async (services) => {
    const id = await resolveUserId(context);
    if (!id) {
      return NextResponse.json(
        error("MISSING_USER_ID", "User id is required"),
        { status: 400 },
      );
    }

    const parsed = await parseJsonRequest(req, updateUserRequestSchema);
    if (parsed.success === false) {
      return NextResponse.json(parsed.body, { status: parsed.status });
    }

    const repository = services.dashboard;
    const users = await repository.list();
    const currentUser = users.find((user) => user.id === id);
    if (!currentUser) {
      return NextResponse.json(error("USER_NOT_FOUND", "User not found"), {
        status: 404,
      });
    }

    if (
      parsed.data.email &&
      users.some(
        (user) =>
          user.id !== id &&
          user.email.toLowerCase() === parsed.data.email?.toLowerCase(),
      )
    ) {
      return NextResponse.json(
        error("EMAIL_CONFLICT", "A user with this email already exists", {
          email: ["A user with this email already exists"],
        }),
        { status: 409 },
      );
    }

    const updatedUser = await repository.update(id, parsed.data);

    if (!updatedUser) {
      return NextResponse.json(error("USER_NOT_FOUND", "User not found"), {
        status: 404,
      });
    }

    return NextResponse.json(success({ user: updatedUser }));
  });
}

export async function DELETE(_req: Request, context: RouteContext) {
  return withAppServices(async (services) => {
    const id = await resolveUserId(context);
    if (!id) {
      return NextResponse.json(
        error("MISSING_USER_ID", "User id is required"),
        { status: 400 },
      );
    }

    const deleted = await services.dashboard.delete(id);
    if (!deleted) {
      return NextResponse.json(error("USER_NOT_FOUND", "User not found"), {
        status: 404,
      });
    }

    return NextResponse.json(success({}));
  });
}
