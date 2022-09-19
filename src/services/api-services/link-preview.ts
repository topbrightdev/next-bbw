import axios from "axios";

interface LinkPreviewProps {
  url: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export const getLinkPreview = async ({ url, isFirst, isLast }: LinkPreviewProps) => {
  const response = await axios.post("/api/link-preview", {
    url,
    isFirst,
    isLast,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
    },
  });
  response.data["url"] = url;
  return response.data;
};
