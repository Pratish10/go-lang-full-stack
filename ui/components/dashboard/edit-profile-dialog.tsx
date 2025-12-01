"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { User } from "@/lib/store/auth-store";
import {
  profileUpdateSchema,
  type ProfileUpdateFormData,
} from "@/lib/validation/auth-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, X } from "lucide-react";
import axios from "axios";

interface EditProfileDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export function EditProfileDialog({
  user,
  isOpen,
  onClose,
  onSave,
}: EditProfileDialogProps) {
  const [formData, setFormData] = useState<ProfileUpdateFormData>({
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const validated = profileUpdateSchema.parse(formData);
      const updatedUser: User = {
        ...user,
        ...validated,
      };
      const response = await axios.put(
        `http://localhost:8080/user/${user.ID}`,
        {
          FirstName: updatedUser.first_name.trim(),
          LastName: updatedUser.last_name.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.success && response.data) {
        onSave(response.data.data as User);
        onClose();
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.errors) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={onClose}
          >
            <motion.div
              className="w-full max-w-md rounded-lg border border-border/50 bg-card shadow-lg"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/50 p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Edit Profile
                </h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="space-y-4 p-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`h-10 ${
                      errors.first_name ? "border-destructive" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.first_name && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.first_name}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`h-10 ${
                      errors.last_name ? "border-destructive" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {errors.last_name && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.last_name}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
