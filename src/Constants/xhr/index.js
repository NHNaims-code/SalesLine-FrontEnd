import Cookies from "js-cookie";
export const headerOptions = {
  Accept: "application/json",
  "Content-Type": "application/json",
},
  user_token = Cookies.get("user_token"),

  baseUrl = "{YOUR_API_URL}/user"
