"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

// Define a type for the expected error response structure
type ErrorResponse = {
  message: string;
};

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", {
        name,
        position,
        email,
        password,
      });

      if (response.status === 200) {
        router.push("/admin");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setErrorMessage(
        axiosError.response?.data?.message || "Error registering user."
      );
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        router.push("/admin");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setErrorMessage(
        axiosError.response?.data?.message || "Error logging in."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />

                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            className="text-blue-500 ml-2"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
