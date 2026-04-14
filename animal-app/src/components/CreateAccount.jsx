const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Use your Render URL here, or keep the env variable logic
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    try {
      // 1. Registration Request
      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          (data.username && data.username[0]) ||
            (data.email && data.email[0]) ||
            data.detail ||
            "Registration failed."
        );
        setLoading(false);
        return;
      }

      setSuccessMsg(`Registration successful! Welcome, ${formData.username}.`);

      // 2. Auto login Request
      const loginResponse = await fetch(`${API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(loginData.detail || "Login after registration failed.");
        setLoading(false);
        return;
      }

      localStorage.setItem("access_token", loginData.access);
      localStorage.setItem("refresh_token", loginData.refresh);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      // This is where the ERR_CONNECTION_REFUSED was being caught
      setError("Network error. Please check if the server is awake.");
    }

    setLoading(false);
  };