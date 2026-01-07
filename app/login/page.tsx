"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { STATS_DATA } from "@/lib/common-utils";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Heart, Shield, Sparkle, Star, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user, loading: userLoading } = useFirebaseAuth();
  useEffect(() => {
    if (user && !userLoading) {
      router.push("/");
    }
  }, [user, userLoading, router]);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed in with Google!");
      router.push("/");
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (userLoading) {
    return <Loader message="Checking authentication..." />;
  }
  const stats = STATS_DATA;
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-400 via-red-500 relative overflow-y-auto">
      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)]">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-1">
            <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full">
                    <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-white fill-current animate-pulse-soft" />
                  </div>
                  <Sparkle className="h-6 w-6 sm:h-8 sm:w-8 text-golden absolute -top-2 -right-2 animate-pulse" />
                  <Star className="h-4 w-4 sm:h-6 sm:w-6 text-white absolute -bottom-1 -left-1 animate-float" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Find Your
                <span className="block bg-linear-to-r from-white to-white/20 bg-clip-text ">
                  Perfect Match
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
                Join millions of amazing people looking for love, friendship,
                and meaningful connections.
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                      {stat.label}
                    </div>
                    <div className="text-white/80 text-xs sm:text-sm">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-2 lg:order-2">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 overflow-hidden shadow-2xl">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-soft opacity-50"></div>
                <CardHeader
                  className="relative text-center space-y-3 sm:space-y-4 lg:space-y-6 pb-4 sm:pb-6 lg:pb-8 pt-4 sm:pt-6"
                >
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="bg-linear-to-br from-pink-400 via-red-500 to-yellow-500 p-3 sm:p-4 rounded-full shadow-glow">
                        <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-white fill-current" />
                      </div>
                      <Sparkle className="h-5 w-5 sm:h-6 sm:w-6 text-golden absolute -top-1 -right-1 animate-pulse" />
                      <div className="absolute -bottom-2 -left-2 bg-passionate rounded-full p-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-white fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-500">
                      Join Now
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium px-2 sm:px-0">
                      Start your love journey today with Google Sign-In!
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4 text-golden" />
                      <span>Instant Setup</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-romantic" />
                      <span>Verified Users</span>
                    </div>
                  </div>
                </CardHeader>
              </div>
              <CardContent className="space-y-3 sm:space-y-4 lg:space-y-6 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                <div className="flex justify-center">
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    variant="destructive"
                    size="lg"
                    className="w-full sm:w-fit h-11 sm:h-12 lg:h-14 bg-red-500 text-sm sm:text-base lg:text-lg font-semibold rounded-full relative overflow-hidden group"
                  >
                  {loading ? (
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs sm:text-sm lg:text-base">Creating your account...</span>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3 relative z-10">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="whitespace-nowrap">Continue with Google</span>
                        <Heart className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse-soft" />
                      </div>
                    </>
                  )}
                  </Button>
                </div>
                <div className="bg-linear-soft rounded-lg text-center py-2 sm:py-3">
                  <div className="flex justify-center items-center space-x-2 sm:space-x-4">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-romantic" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      Secure & Private
                    </span>
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs text-gray-500 text-center leading-relaxed px-2 sm:px-0">
                  By signing up, you agree to our{" "}
                  <a
                    href="#"
                    className="text-romantic hover:underline font-medium"
                  >
                    Terms of Services
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-romantic hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
