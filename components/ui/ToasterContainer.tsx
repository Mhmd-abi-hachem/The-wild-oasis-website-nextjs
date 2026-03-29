import { Toaster } from "react-hot-toast";

export default function ToasterContainer() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#10b981",
            secondary: "#1B2631",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#1B2631",
          },
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "12px 24px",
          borderRadius: "4px",
          border: "1px solid #374151",
          backgroundColor: "#1B2631",
          color: "#E1E8EF",
        },
      }}
    />
  );
}
