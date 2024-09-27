import axios from "axios";
require("dotenv").config();

const webhookUrl = process.env.DISCORD_WEBHOOK as string;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

type requestType = {
  username?: string | "ATRS";
  content?: string;
  embeds?: {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    footer?: {
      text: string;
      icon_url?: string;
    };
    image?: {
      url: string;
    };
    thumbnail?: {
      url: string;
    };
    author?: {
      name?: string;
      url?: string;
      icon_url?: string;
    };
    fields?: {
      name: string;
      value: string;
      inline?: boolean;
    }[];
  }[];
};

const postWebhook = async (req: requestType) => {
  if (!webhookUrl) {
    console.error("Webhook URL is not defined");
    return;
  }
  const res = await axios.post(webhookUrl, JSON.stringify(req), config);
  if (res.status !== 204) {
    console.error("Failed to post webhook");
  }
};

export default postWebhook;
