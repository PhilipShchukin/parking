import { useMutation } from "@tanstack/react-query";
import { authSevice } from "@/services/auth.sevice";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export function useLogoutMutation() {

	const navigate = useNavigate();

	const { mutate: logout } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => authSevice.logout(),
		onSuccess() {
		  toast.success(`Successfully logout`);
		  
		  navigate("/")
		},
	  });

	return { logout }
}