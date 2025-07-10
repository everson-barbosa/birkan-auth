import { Request, Response } from 'express';
import { ACCESS_TOKEN_KEY } from '../constants/access-token-key';
import * as cookie from 'cookie';

const ONE_HOUR = 1000 * 60 * 60;

interface SetAccessTokenCookieProps {
  readonly res: Response;
  readonly accessToken: string;
}

export function setAccessTokenCookie({
  res,
  accessToken,
}: SetAccessTokenCookieProps) {
  res.cookie(ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    maxAge: ONE_HOUR,
  });
}

interface RemoveAccessTokenCookieProps {
  readonly res: Response;
}

export function removeAccessTokenCookieProps({
  res,
}: RemoveAccessTokenCookieProps) {
  res.cookie(ACCESS_TOKEN_KEY, '', {
    httpOnly: true,
    expires: new Date(0),
  });
}

export function extractAccessTokenFromHeader(req: Request) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const accessToken = cookies[ACCESS_TOKEN_KEY];

  if (!accessToken) return null;

  return accessToken;
}
