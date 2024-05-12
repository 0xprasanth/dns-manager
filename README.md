# DNS Manager 

[![Netlify Status](https://api.netlify.com/api/v1/badges/baf2dd6a-e036-4df0-b7ec-81708459b5e4/deploy-status)](https://app.netlify.com/sites/dns-manager-lambda/deploys)

Dashboard for DNS manager

Click here for [Live Demo](https://dns-manager-lambda.netlify.app/)

Create a simple dashboard to upload/view domains and DNS records in a table format.

The types of DNS records include:

    1. A (Address) Record
    2. ⁠ ⁠AAAA (IPv6 Address) Record
    3. .⁠ ⁠CNAME (Canonical Name) Record
    4. ⁠MX (Mail Exchange) Record
    5. ⁠NS (Name Server) Record
    6. ⁠ ⁠PTR (Pointer) Record
    7. ⁠ ⁠SOA (Start of Authority) Record
    8. ⁠SRV (Service) Record
    9.  ⁠TXT (Text) Record
    10. ⁠DNSSEC

  - Implement forms/modals for adding, editing, and deleting DNS record entries for domains.
  - Include filters, search options for easy bulk data navigation.

## User Interface:
  - Include status indicators, alerts, and notifications for user guidance.
  - Implement secure user authentication and authorization.


## ⁠Backend Integration:
  - Establish backend API endpoints connecting the UI to the DNS system on AWS Route 53.
  - Implement API calls for CRUD operations on DNS records.

### Visit Backend Repo [dns-manager-backend](https://github.com/ptech12/dns-manager-backend)


