import axios from "axios";

export const base_api_url = "http://localhost:8080";

const jwtToken = localStorage.getItem("jwt");

export const api = axios.create({baseURL: base_api_url,
    headers:{
        "Authorization" : `Bearer ${jwtToken}`,
        "Content-Type" : "application/json"
    }
})