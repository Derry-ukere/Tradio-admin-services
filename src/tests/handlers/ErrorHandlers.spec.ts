import { mockRes } from 'sinon-express-mock';
import { handleErrorResponse } from '../../handlers/RouteHandlers';
import { ErrorCode } from '../../constants';
import { ErrorLog } from '../../handlers/ErrorLog';

describe('RouteHandlers test suite', () => {
  describe('Error responses handler', () => {
    it('Responds with 400 on BAD_REQUEST', () => {
      const res = mockRes();

      handleErrorResponse(
        <any>{
          code: ErrorCode.BAD_REQUEST,
          message: 'Some inportant stuff are missing',
        },
        res,
      );

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.firstCall.args[0]).toEqual(400);
      expect(res.json.calledOnce).toBe(true);
    });

    it('Responds with 503 on REQUEST_FAILED', () => {
      const res = mockRes();

      handleErrorResponse(
        <any>{
          code: ErrorCode.REQUEST_FAILED,
          message: 'This request failed',
        },
        res,
      );

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.firstCall.args[0]).toEqual(503);
      expect(res.json.calledOnce).toBe(true);
    });

    it('Responds with 403 on FORBIDDEN', () => {
      const res = mockRes();

      handleErrorResponse(
        <any>{
          code: ErrorCode.FORBIDDEN,
          message: 'Access to this thing is forbidden.',
        },
        res,
      );

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.firstCall.args[0]).toEqual(403);
      expect(res.json.calledOnce).toBe(true);
    });

    it('Responds with 404 on RESOURCE_NOT_FOUND', () => {
      const res = mockRes();

      handleErrorResponse(
        <any>{
          code: ErrorCode.RESOURCE_NOT_FOUND,
          message: 'Some inportant stuff are missing',
        },
        res,
      );

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.firstCall.args[0]).toEqual(404);
      expect(res.json.calledOnce).toBe(true);
    });

    it('Responds with 503 on unhandled error code types', () => {
      const res = mockRes();

      handleErrorResponse(
        <any>{
          code: ErrorCode.SERVICE_UNAVAILABLE,
          message: 'Processor errored',
        },
        res,
      );

      expect(res.status.calledOnce).toBe(true);
      expect(res.status.firstCall.args[0]).toEqual(503);
      expect(res.json.calledOnce).toBe(true);
    });

    it('Responds with 500 on undefined error code', () => {
      const res = mockRes();

      ErrorLog.log = jest.fn();

      handleErrorResponse(<any>{}, res);

      expect(ErrorLog.log).toHaveBeenCalledTimes(1);
      expect(res.status.calledOnce).toBe(true);
      expect(res.status.firstCall.args[0]).toEqual(500);
      expect(res.json.calledOnce).toBe(true);
    });
  });
});
