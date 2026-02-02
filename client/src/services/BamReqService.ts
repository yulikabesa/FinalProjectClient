import type { AxiosError } from "axios";
import axios from "axios";

class BamReqService {
  createNewBamReq = async (
    newBamRequest: {
      title: string;
      type: string;
      submitReason: string;
      openedBy: string;
      status: string;
    },
    token: string
  ) => {
    const url = "http://localhost:3000/bamRequest/";
    try {
      const response = await axios.post(url, newBamRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  // get bam reqs by type and status
  getBamReqs = async (token: string, page: number, filter?: {type?: string, status?: string; endDate?: Date; startDate?: Date, exclude?: string}) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (filter && filter.type) params.append("type", filter.type);
    if (filter && filter.status) params.append("status", filter.status);
    if (filter && filter.startDate) params.append('startDate', filter.startDate.toString());
    if (filter && filter.endDate) params.append('endDate', filter.endDate.toString());
    if (filter && filter.exclude) params.append("excludeStatus", filter.exclude);


    // Convert params to string and append to the URL
    const url = `http://localhost:3000/bamRequest/requests?${params.toString()}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  getReqsByUserId = async (token: string, id: string, page: number) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    // Convert params to string and append to the URL
    const url = `http://localhost:3000/bamRequest/requests/${id}?${params.toString()}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  changeReqStatus = async (
    reqId: string,
    reqStatus: "approve" | "reject",
    token: string, 
    reqReason?: string
  ) => {
    const url = `http://localhost:3000/bamRequest/${reqStatus}/${reqId}`;
    try {
      const toSend = reqReason? {rejectReason: reqReason} : undefined;
      const response = await axios.patch(url, toSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
}

const bamReqService = new BamReqService();

export default bamReqService;
