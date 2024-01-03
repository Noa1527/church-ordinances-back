import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from 'src/modules/user/user.schema';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserDocument | null => {
    const user = ctx.switchToHttp().getRequest().user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
