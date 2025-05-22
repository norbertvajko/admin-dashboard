'use client';

import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

type LocationData = Record<string, any>;

interface UserInfo {
  device?: string;
  location?: { data: LocationData };
  acceptedDate?: string;
}

interface CookieConsentHook {
  isOpen: boolean;
  hide: boolean;
  hasConsented: boolean;
  accept: () => void;
  decline: () => void;
  userInfo: UserInfo | null;
}

const COOKIE_NAME = 'cookieConsent';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days = 3650) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getUserInfo(): UserInfo | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('userInfo');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeUserInfo(info: UserInfo) {
  try {
    // Wrap info inside { userInfo: ... } when storing locally
    localStorage.setItem('userInfo', JSON.stringify({ userInfo: info }));
  } catch {
    // silent fail
  }
}

export function useCookieConsent({
  demo = false,
  onAcceptCallback = () => { },
  onDeclineCallback = () => { },
} = {}): CookieConsentHook {
  const { isSignedIn, isLoaded } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(() => {
    // When retrieving from localStorage, unwrap the userInfo object
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('userInfo');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.userInfo || null;
    } catch {
      return null;
    }
  });
  const [hasConsented, setHasConsented] = useState<boolean>(() => !!getCookie(COOKIE_NAME));

  const accept = useCallback(async () => {
    setCookie(COOKIE_NAME, 'true');
    setIsOpen(false);
    setHasConsented(true);

    try {
      const res = await fetch('https://ipapi.co/json/');
      const locationData: LocationData = res.ok ? await res.json() : {};

      const updatedInfo: UserInfo = {
        ...(userInfo || {}),
        device: navigator.userAgent,
        acceptedDate: new Date().toISOString(),
        location: { data: locationData },
      };

      storeUserInfo(updatedInfo);
      setUserInfoState(updatedInfo);

      // Only send to server if user is logged in
      if (isSignedIn) {
        try {
          // Wrap updatedInfo inside { userInfo: ... } before sending
          await fetch('/api/user-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInfo: updatedInfo }),
          });
          // Optionally clear local storage after sync:
          // localStorage.removeItem('userInfo');
        } catch (err) {
          console.error('Failed to sync user info to server:', err);
        }
      }
    } catch {
      // fail silently
    }

    setTimeout(() => setHide(true), 700);
    onAcceptCallback();
  }, [userInfo, isSignedIn, onAcceptCallback]);

useEffect(() => {
  if (!isLoaded || !isSignedIn) return;

  const storedInfoRaw = localStorage.getItem('userInfo');
  if (!storedInfoRaw) return;

  const syncConsent = async () => {
    try {
      await fetch('/api/user-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: storedInfoRaw,
      });
      localStorage.removeItem('userInfo');
    } catch (err) {
      console.error('Failed to sync stored user info on login:', err);
    }
  };

  syncConsent();
}, [isLoaded, isSignedIn]);

  const decline = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setHide(true), 700);
    onDeclineCallback();
  }, [onDeclineCallback]);

  useEffect(() => {
    if (!hasConsented || demo) {
      setIsOpen(true);
    } else {
      setTimeout(() => setHide(true), 700);
    }
  }, [hasConsented, demo]);

  return {
    isOpen,
    hide,
    hasConsented,
    accept,
    decline,
    userInfo,
  };
}