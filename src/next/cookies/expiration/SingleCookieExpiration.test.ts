import {CookieSetter} from '../setter/CookieSetter.js';
import {SingleCookieExpiration} from './SingleCookieExpiration.js';

const mockSetter: CookieSetter = {
  setCookies: jest.fn()
};

const cookieSerializeOptions = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  maxAge: 12 * 60 * 60 * 24,
  expires: new Date(1727373870 * 1000)
};

describe('SingleCookieExpiration', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should remove single cookie', () => {
    const expiration = new SingleCookieExpiration('TestCookie', mockSetter);

    expiration.expireCookies(cookieSerializeOptions);

    expect(mockSetter.setCookies).toHaveBeenCalledWith(
      [{name: 'TestCookie', value: ''}],
      {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax' as const,
        expires: new Date(0)
      }
    );
  });
});
