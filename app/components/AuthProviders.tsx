"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const getLoginProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    getLoginProviders();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {providers
        ? Object.values(providers).map((provider) => (
            <button className="button" key={provider?.id} onClick={() => signIn(provider?.id)}>
              Sign in with <FcGoogle size={25} style={{display: 'inline'}}/>
            </button>
          ))
        : null}
    </div>
  );
};

export default AuthProviders;
