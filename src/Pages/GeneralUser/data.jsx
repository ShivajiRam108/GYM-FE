import axios from 'axios';

// Monthly Joined Members
const getMonthlyJoined = async () => {
  try {
    const response = await axios.get("http://localhost:3002/members/monthly-member", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Monthly Joined Members:", error);
    throw error;
  }
};

// Expiring within 3 Days
const threeDaysExpire = async () => {
  try {
    const response = await axios.get("http://localhost:3002/members/within-3-days-expiring", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members expiring in 3 days:", error);
    throw error;
  }
};

// Expiring within 4-7 Days
const fourToSevenDaysExpire = async () => {
  try {
    const response = await axios.get("http://localhost:3002/members/within-4-to-7-days-expiring", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members expiring in 4-7 days:", error);
    throw error;
  }
};

// Expired Members
const expiredData = async () => {
  try {
    const response = await axios.get("http://localhost:3002/members/expired-members", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expired members:", error);
    throw error;
  }
};

// Inactive Members
const inactiveMembers = async () => {
  try {
    const response = await axios.get("http://localhost:3002/members/inactive-members", {
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
