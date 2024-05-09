import { useQuery } from "@tanstack/react-query"
import { fetchDNSRecords } from "../apis"


export const useDNSRecords = accessToken => {
    return useQuery({
        queryKey: ["dns-records"],
        queryFn: async () => await fetchDNSRecords(accessToken)
    })
}