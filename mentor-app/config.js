const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://mentoree.netlify.app";

// export const server = "http://localhost:3000";
