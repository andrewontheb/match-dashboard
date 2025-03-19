export const fetchMatchesData = async () => {
    const response = await fetch("https://app.ftoyd.com/fronttemp-service/fronttemp");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };
