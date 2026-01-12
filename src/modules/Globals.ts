import { createDeliveryClient } from "@kontent-ai/delivery-sdk";

const isDevMode = process.env.NODE_ENV !== "production";

export const deliveryClient = createDeliveryClient({
  environmentId: "499190aa-4dd9-0009-461f-dc3544e2f48b",
  secureApiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NDZjNTJiOWQ2Nzc0YzFhODA4OTc5ZDVjNGMxYTdmYSIsImlhdCI6MTc2NzYxMzgzNiwibmJmIjoxNzY3NjEzODM2LCJleHAiOjE4OTYyNjMzNDAsInZlciI6IjIuMC4wIiwic2NvcGVfaWQiOiIyYjlkYTA2YTNmYTc0MmVlYWQ5ZGJiYjhjNDc0NTFmYiIsInByb2plY3RfY29udGFpbmVyX2lkIjoiZTA4NWUyMGUzNGRhMDA5MDE2NDA4MjdkNGJmMzBiZGIiLCJhdWQiOiJkZWxpdmVyLmtvbnRlbnQuYWkifQ.t0fWj-Cu-ma-GHrYkwV3vu4mI29LTACIHk337Ig-J-o",
  defaultQueryConfig: {
    useSecuredMode: true,
  },
 
});

export const EventID = "04f6919c-7c2c-4397-b46c-efcfcab1539a";
export const SITE_NAME = "Asrar Show";
export const SITE_URL = "https://www.asrarshow.com/";
