import { useQuery } from "@tanstack/react-query"
import { DNS } from ""

export const useDNSRecords = accessToken => {
    return useQuery({
        queryKey: ["dns-records"],
        queryFn: async () => await fetchDNSRecords(accessToken)
    })
}