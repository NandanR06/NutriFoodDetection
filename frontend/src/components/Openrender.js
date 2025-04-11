const Openrouter = async (prompt) => {
console.log("Prompt:", prompt);
  try {
    const res = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Failed to fetch chatbot response:", err);
    return null;
  }
};

export default Openrouter;
