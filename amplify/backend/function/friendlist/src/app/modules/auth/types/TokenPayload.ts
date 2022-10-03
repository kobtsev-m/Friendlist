import { Role } from '../../../entities/user.entity';

export interface TokenPayload {
  id: string;
  role: Role;
}
