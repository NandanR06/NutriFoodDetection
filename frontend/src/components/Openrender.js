// generate a response from the OpenRouter API

const Openrouter = async (prompt) => {
  console.log("🟡 Prompt sent to AI:", prompt);
  try {
    const res = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(" Openrouter API responded with error:", data);
      return null;
    }

    if (!data || typeof data.data !== "string") {
      console.error(" Unexpected response format from Openrouter:", data);
      return null;
    }

    console.log(" Raw response from Openrouter:", data.data);
    return data.data;
  } catch (err) {
    console.error(" Failed to fetch chatbot response:", err);
    return null;
  }
};

export default Openrouter;
