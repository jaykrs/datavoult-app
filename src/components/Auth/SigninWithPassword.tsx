"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useRouter } from 'next/navigation';

export default function SigninWithPassword() {
  const [data, setData] = useState({
    username: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    remember: false,
  });
const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
signin(data.username , data.password);
console.log(data.username);

// You can remove this code block
    setLoading(true);
e.preventDefault();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const signin = async (username : string, password : string) =>  {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      

      if (res.headers.get('x-middleware-set-cookie')) {
        const authorizationToken = res.headers.get('x-middleware-set-cookie');
        const responseData = await res.json();
        localStorage.setItem("userEmail", responseData.data.email);
        localStorage.setItem("userName", responseData.data.name);
        const token = extractAuthToken(authorizationToken?authorizationToken:"");
        localStorage.setItem("userToken", token?token:"");
        const redirectPath = responseData.data.role === 'admin' ? "/admin/dashboard" : "/dashboard";
        router.push(redirectPath);
      } else{
        router.push("/auth/sign-in");
      }

    }catch (err) {
      console.error(err);
    }
    
  };

  function extractAuthToken(cookieString: string): string | null {
    if (!cookieString || typeof cookieString !== 'string') {
        return null;
    }
    const tokenMatch = cookieString.match(/authToken=([^;]+)/);
    if (!tokenMatch || tokenMatch.length < 2) {
        return null;
    }
    const token = tokenMatch[1];
    
    // Additional JWT validation (basic structure check)
    if (!isValidTokenStructure(token)) {
        throw new Error('Extracted token does not appear to be a valid JWT format');
    }
    return token;
}

function isValidTokenStructure(token: string): boolean {
    // Very basic JWT format check (3 parts separated by dots)
    return token.split('.').length === 3;
}
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="username"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}
