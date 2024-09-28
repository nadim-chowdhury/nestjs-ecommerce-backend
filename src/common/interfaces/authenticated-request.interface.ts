import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: { id: number }; // Adjust based on your user object structure
}
