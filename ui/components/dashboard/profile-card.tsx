"use client"

import { motion } from "motion/react"
import type { User } from "@/lib/store/auth-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Calendar } from "lucide-react"

interface ProfileCardProps {
  user: User
}

export function  ProfileCard({ user }: ProfileCardProps) {
  const joinDate = new Date(user?.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border/50 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-semibold text-primary-foreground">
                {user.first_name[0]}
                {user.last_name[0]}
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {user.first_name} {user.last_name}
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            {/* Email */}
            <motion.div className="flex items-start gap-3" variants={itemVariants}>
              <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </motion.div>

            {/* Join Date */}
            <motion.div className="flex items-start gap-3" variants={itemVariants}>
              <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium text-foreground">{joinDate}</p>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
