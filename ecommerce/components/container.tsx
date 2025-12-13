import { cn } from "@/lib/utils";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("mx-w-screen-xl max-auto px-4", className)}>
            {children}
        </div>
    )
}

export default Container