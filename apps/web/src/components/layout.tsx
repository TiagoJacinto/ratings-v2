import { Toaster } from "sonner";

export function BaseLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
	return (
		<>
			{children}
			<Toaster />
		</>
	)
}
