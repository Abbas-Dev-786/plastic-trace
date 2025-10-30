export const URL = import.meta.env.DEV
  ? "http://192.168.1.5:5000/api"
  : "https://plastic-trace-api.vercel.app/api";

export const CHAIN_ID = 545;

export const ROLES = {
  ADMIN: "ADMIN_ROLE",
  MANUFACTURER: "MANUFACTURER_ROLE",
  RECYCLER: "RECYCLER_ROLE",
  RAG_PICKER: "RAGPICKER_ROLE",
  CITIZEN: "CITIZEN_ROLE",
};
