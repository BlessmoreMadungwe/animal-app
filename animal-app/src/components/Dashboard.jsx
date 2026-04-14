useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return; // Stop execution if no token
    }

    // Use your Render URL from environment variables
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    // Example: Fetch dashboard data from Render
    fetch(`${API_BASE_URL}/api/dashboard/`, {
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (res.status === 401) {
          // If token is expired or invalid, send them to login
          handleLogout();
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUsername(data.username || "User");
        setStats({
          tasks: data.tasks || 12,
          messages: data.messages || 5,
          notifications: data.notifications || 3,
        });
      })
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, [navigate]);