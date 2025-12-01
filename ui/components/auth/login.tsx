"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { useAuthStore, User } from "@/lib/store/auth-store";
import { LoginSchema, LoginType } from "@/lib/validation/auth-validation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "../SharedComponent/FormInputField";
import { Form } from "../ui/form";
import axios from "axios";

export function LoginInForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submitHandler = async (data: LoginType) => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/login", data);

      if (response.data.success && response.data) {
        login(response.data.data as User);
        router.push("/dashboard");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Email Field */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FormInputField<LoginType>
            name="email"
            label="Email"
            placeholder="Enter your email"
            control={form.control}
            type="email"
            disabled={isLoading}
          />
        </motion.div>

        {/* Password Field */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FormInputField<LoginType>
            name="password"
            label="Password"
            placeholder="••••••••"
            control={form.control}
            type="password"
            disabled={isLoading}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>
        </motion.p>
      </motion.form>
    </Form>
  );
}
