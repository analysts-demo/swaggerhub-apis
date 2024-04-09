import { sleep } from"k6";
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  duration: "1m",
  vus: 1,
  thresholds: {
    http_req_duration: ["p(10)<500"] // 95 percent of response times must be below 500ms
  }
};

export default function() {
  http.get(`http://analystsdemo.apigw-aw-eu.webmethods.io/gateway/swaggerhub-petstore/1.0.0/pet/findByStatus?status=sold`)	
  sleep(3);
};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
