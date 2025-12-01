"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { useAuthStore, User } from "@/lib/store/auth-store"
import { RegisterType, RegisterSchema } from "@/lib/validation/auth-validation"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInputField from "../SharedComponent/FormInputField"
import { Form } from "../ui/form"
import axios from "axios"

export function RegisterForm() {
  const router = useRouter()
  const { register } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", firstName: "", lastName: "" },
  })

  const submitHandler = async (data: RegisterType) => {
    setIsLoading(true);

    const payload = {
      First_name: data.firstName,
      Last_name: data.lastName,
      email: data.email,
      password: data.password,
    }

    try {
      const response = await axios.post("http://localhost:8080/register", payload);

      if (response.data.success && response.data) {
        register(response.data.data as User);
        router.push("/login");
      } else {
        console.error("Register failed:", response.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
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
        {/* First Name */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FormInputField<RegisterType>
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            control={form.control}
            type="text"
            disabled={isLoading}
          />
        </motion.div>

        {/* Last Name */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <FormInputField<RegisterType>
            name="lastName"
            label="Last Name"
            placeholder="Enter your Last name"
            control={form.control}
            type="text"
            disabled={isLoading}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FormInputField<RegisterType>
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
          transition={{ delay: 0.25 }}
        >
          <FormInputField<RegisterType>
            name="password"
            label="Password"
            placeholder="••••••••"
            control={form.control}
            type="password"
            disabled={isLoading}
          />
        </motion.div>

        {/* Confirm Password Field */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FormInputField<RegisterType>
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            control={form.control}
            type="password"
            disabled={isLoading}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </motion.div>

        {/* Sign In Link */}
        <motion.p
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </motion.p>
      </motion.form>
    </Form>
  )
}
