"use client";
import MainLayout from "@/components/MainLayout";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";


export default function Home() {
    const { user, loading: userLoading } = useFirebaseAuth();
    console.log("User in Home page:", user, "Loading:", userLoading);
  return (
 <MainLayout>
  
 </MainLayout>
  );
}
