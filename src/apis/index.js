import axios from "axios";
import { Record, DNS } from "../types/index";

export const fetchDNSRecords = async (accessToken) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/domain/records`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201)
    return response.data.data;
  else throw new Error(`Request failed with status code ${response.status}`);
};

export const createDNSRecord = async (accessToken, record) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/domain/records`,
    {
      record: record,
      hostedZoneData: {
        name: record.domain,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (response.status === 200 || response.status === 201) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};

export const DeleteDNSRecord = async (accessToken, recordId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/domain/records/${recordId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};

export const updateDNSRecord = async (accessToken, record, recordId) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/domain/records/${recordId}`,
    {
      record,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};


export const createBulkDNSRecord = async (accessToken, records) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/domain/records/bulk`,
        { records },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
}