import { Skeleton } from "@/components/ui/skeleton"

export function TaskSkeleton() {
    return (
        <div className="space-y-3">

            <Skeleton className="h-[50px] rounded-xl" />
            <Skeleton className="h-[50px] rounded-xl" />

        </div>
    )
}
