// src/types/index.jsx

export const RecordType =
  "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "DS";


export const DNS = {
    id: "",
    domain: "",
    type: RecordType, // Valid record types (e.g., "A", "AAAA", "CNAME", etc.)
    value: "", // Value format depends on record type
    ttl: 0, // Time-to-live in seconds
    priority: 0, // Required for MX and SRV records
    weight: 0, // Required for SRV records
    port: 0, // Required for SRV records
    target: "", // Required for SRV records
    keyTag: 0, // Required for DS records
    algorithm: 0, // Required for DS records
    digestType: 0, // Required for DS records
    digest: "", // Required for DS records
}

export const Record = {
  domain: "",
  type: RecordType, // Valid record types (e.g., "A", "AAAA", "CNAME", etc.)
  value: "", // Value format depends on record type
  ttl: 0, // Time-to-live in seconds
  priority: 0, // Required for MX and SRV records
  weight: 0, // Required for SRV records
  port: 0, // Required for SRV records
  target: "", // Required for SRV records
  keyTag: 0, // Required for DS records
  algorithm: 0, // Required for DS records
  digestType: 0, // Required for DS records
  digest: "", // Required for DS records
}


export const dummyData = [
  {
    id: "1",
    domain: "example.com",
    type: "A",
    value: "192.0.2.1",
    ttl: 3600,
  },
  {
    id: "2",
    domain: "example.com",
    type: "AAAA",
    value: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    ttl: 3600,
  },
  {
    id: "3",
    domain: "example.com",
    type: "CNAME",
    value: "www.example.com",
    ttl: 3600,
  },
];
