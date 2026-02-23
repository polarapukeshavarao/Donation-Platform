export const getDonations = () =>
  JSON.parse(localStorage.getItem("donations")) || [];

export const saveDonations = (data) =>
  localStorage.setItem("donations", JSON.stringify(data));

export const getRequests = () =>
  JSON.parse(localStorage.getItem("requests")) || [];

export const saveRequests = (data) =>
  localStorage.setItem("requests", JSON.stringify(data));