// app/api/getCookie/getCookie.ts
import { cookies } from "next/headers"

const GetCookie = () => {
  return cookies()
}

export default GetCookie
