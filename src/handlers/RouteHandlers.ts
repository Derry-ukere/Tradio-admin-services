import { Request, Response } from 'express';
import { IErrorObject } from '../interfaces';
import { ErrorCode } from '../constants';
import { ErrorLog } from './ErrorLog';

/**
 * Handles undefined route errors
 * @param req Express request
 * @param res Express response
 */
export async function handleRouteError(req: Request, res: Response): Promise<Response> {
  return res.status(404).json({
    errors: {
      message: 'Invalid route. See documentation.',
      error: {
        status: 404,
      },
    },
  });
}

/**
 * Handles errors based on response codes.
 *  Advantage is, here, we can decide to report specific error types
 *  For now, we're only reporting 500
 * @param {Error} err    Custom error object
 * @param {Response} res Express response handler
 * @returns {Response}
 */
export const handleErrorResponse = (err: IErrorObject, res: Response): Response => {
  const { message, code } = err;

  if (code === ErrorCode.SERVER_ERROR || code === undefined) {
    ErrorLog.log(err);

    return res.status(500).json({
      code: ErrorCode.SERVER_ERROR,
      message: 'An unexpected internal server error occurred',
      data: err.stack,
    });
  }

  switch (code) {
    case ErrorCode.FORBIDDEN:
      return res.status(403).json({
        ...err,
        message: message || 'Unauthorized endpoint access',
      });
    case ErrorCode.BAD_REQUEST:
      return res.status(400).json({
        ...err,
        message: message || 'Some important parameters are missing. See documentation',
      });
    case ErrorCode.REQUEST_FAILED:
      return res.status(503).json(err);
    case ErrorCode.RESOURCE_NOT_FOUND:
      return res.status(404).json(err);
    default:
      return res.status(503).json(err);
  }
};
