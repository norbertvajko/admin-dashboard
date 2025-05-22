import { useAuth } from "@/components/providers/auth-providers";
import { useQuery } from "@tanstack/react-query";

interface FullUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  createdAt: Date;
  info: JSON;
}

const fetchFullUser = async (userId: string): Promise<FullUser> => {
  const res = await fetch(`/api/users/${userId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};

export const useCurrentUser = () => {
  const { user, isSignedIn, isLoaded } = useAuth();

  const query = useQuery({
    queryKey: ["fullUser", user?.id],
    queryFn: () => fetchFullUser(user!.id),
    enabled: isLoaded && isSignedIn && !!user,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    fullUser: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};
