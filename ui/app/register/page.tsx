"use client"

import { useAuthStore } from "@/lib/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "motion/react"
import { RegisterForm } from "@/components/auth/register"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <Loader2 />
    </div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/10">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border border-border/50 bg-card/95 backdrop-blur-sm p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join us today and get started</p>
          </motion.div>
          <RegisterForm />
        </Card>
      </motion.div>
    </div>
  )
}
