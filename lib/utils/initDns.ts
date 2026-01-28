import dns from "node:dns/promises";

export const initDns = () => {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  dns.setDefaultResultOrder("ipv4first");
};
