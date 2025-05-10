import { useMutation } from "@tanstack/react-query";
import { authSevice } from "@/services/auth.sevice";
import type { IAuthForm } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export function useAuthMutation(reset: () => void, type: "login" | "register") {

	const navigate = useNavigate();

	const { mutate, data } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IAuthForm) => authSevice.main(type, data),
		onSuccess() {
		  toast.success(`Successfully ${type}ed`);
		  reset();
		  if (type === 'login') {
			navigate("/dashboard")
		  }
		},
	  });

	return { mutate, data }
}