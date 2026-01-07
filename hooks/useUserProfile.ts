"use client";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/lib/types";
import { on } from "events";
import { doc, onSnapshot } from "firebase/firestore";
import { cp } from "fs";
import { use, useCallback, useEffect, useState } from "react";

interface UserProfileResult {
  profile: UserProfile | null;
  loading: boolean;
  error: String | null;
  refresh: () => Promise<void>;
}
export function useUserProfile(userId: string | undefined): UserProfileResult {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    const userRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const profileData = snapshot.data() as UserProfile;
        if (profileData.profileComplete) {
          const profileWithUid = {
            ...profileData,
            uid: userId,
          };
          setProfile(profileWithUid);
          setError(null);
        } else {
          setProfile(null);
          setError(null);
        }
      }else{
        setProfile(null);
        setError(null);
      }
        setLoading(false);
    },(err) =>{
        console.error("Error fetching user profile:", err);
        setError(err.message);
        setProfile(null);
        setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);
  const refresh = useCallback(async () => {
    // Real time listener handles updates, so no action needed here
  }, []);
    return { profile, loading, error, refresh };
}
