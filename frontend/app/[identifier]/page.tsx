"use client";

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import ProfileView from "@/components/social/ProfileView";
import { getUserByIdentifier } from "@backend/db";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import { Loader2 } from "lucide-react";

import ProfileSkeleton from "@/components/social/ProfileSkeleton";

export default function UniversalProfilePage() {
  const params = useParams();
  const identifier = params.identifier as string;
  const [targetId, setTargetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const resolveUser = async () => {
      try {
        const decodedIdentifier = decodeURIComponent(identifier);
        const user = await getUserByIdentifier(decodedIdentifier);
        if (user) {
          setTargetId(user.id);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Resolution failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    resolveUser();
  }, [identifier]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !targetId) {
    notFound();
    return null;
  }

  return <ProfileView targetUserId={targetId} />;
}
