"use client";

import React, { useEffect } from "react";
import { useAuth } from "@backend/AuthProvider";
import { useRouter } from "next/navigation";
import ProfileView from "@/components/social/ProfileView";
import ProfileSkeleton from "@/components/social/ProfileSkeleton";

export default function ProfilePage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/main");
    }
  }, [user, loading, router]);

  if (loading || !user || !userData) {
    return <ProfileSkeleton />;
  }

  // Render the unified profile view for the current user using their canonical ID
  return <ProfileView targetUserId={userData.id} isSelf={true} />;
}
