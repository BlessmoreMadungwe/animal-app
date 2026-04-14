const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Use your Render URL from environment variables
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.access && data.refresh) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        alert(`Welcome back, ${formData.username}!`);
        navigate("/dashboard"); 
      } else {
        setError(data.detail || "Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      // This will now catch errors if your Render server is sleeping
      setError("Network error. The server may be waking up, please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };