
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Monthly Joined Members
const getMonthlyJoined = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/monthly-member`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Monthly Joined Members:", error);
    throw error;
  }
};

// Expiring within 3 Days
const threeDaysExpire = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/within-3-days-expiring`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members expiring in 3 days:", error);
    throw error;
  }
};

// Expiring within 4-7 Days
const fourToSevenDaysExpire = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/within-4-to-7-days-expiring`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members expiring in 4-7 days:", error);
    throw error;
  }
};

// Expired Members
const expiredData = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/expired-members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expired members:", error);
    throw error;
  }
};

// Inactive Members
const inactiveMembers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/inactive-members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching inactive members:", error);
    throw error;
  }
};

export {
  getMonthlyJoined,
  threeDaysExpire,
  fourToSevenDaysExpire,
  expiredData,
  inactiveMembers
};
