"use client"

import { useAuthStore } from "@/lib/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { EditProfileDialog } from "@/components/dashboard/edit-profile-dialog"
import { Button } from "@/components/ui/button"
import { LogOut, Edit2, Shield, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, signOut, updateUser } = useAuthStore()
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/register")
    }
  }, [isAuthenticated, isLoading, router])

  const handleSignOut = () => {
    signOut()
    router.push("/login")
  }

  if (isLoading || !user.user) {
    return <div className="flex items-center justify-center min-h-screen">
      <Loader2 />
    </div>
  }

  console.log(user);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-4 md:p-8">
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your profile and account settings</p>
          </div>
          <div className="flex gap-3 flex-col sm:flex-row w-full md:w-auto">
            <Button
              onClick={() => setIsEditOpen(true)}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-11 flex-1 sm:flex-none"
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="gap-2 h-11 flex-1 sm:flex-none bg-transparent">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {user && <ProfileCard user={user.user} />}
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {/* Account Status */}
          <motion.div
            className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Account Status</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Your account is active and secure</p>
            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
              Active
            </div>
          </motion.div>

          {/* Member Since */}
          <motion.div
            className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Member Since</h3>
            <p className="text-2xl font-bold text-primary">
              {new Date(user.user?.created_at ?? "").toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Edit Dialog */}
      {user && <EditProfileDialog user={user.user} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={updateUser} />}
    </div>
  )
}
