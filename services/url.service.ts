const service = {
  async getUrls({ page, limit }) {
    const params = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;

    const queryString = new URLSearchParams(params).toString();

    try {
      const res = await fetch(
        `/api/shortener${queryString ? `?${queryString}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json;
    } catch (e) {
      throw e;
    }
  },
  async create(values) {
    try {
      const res = await fetch("/api/shortener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json;
    } catch (e) {
      throw e;
    }
  },
  async update(values) {
    try {
      const res = await fetch("/api/shortener", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      return json;
    } catch (e) {
      throw e;
    }
  },
  async remove(id) {
    try {
      const res = await fetch("/api/shortener", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortUrl: id }),
      });

      if (!res.ok) {
        throw new Error("Something failed");
      }

      return;
    } catch (e) {
      throw e;
    }
  },
  async ttl(values) {
    try {
      const res = await fetch("/api/shortener/ttl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return {
        ...json.url,
        expiresIn: Date.now() + 5 * 60 * 1000,
      };
    } catch (e) {
      throw e;
    }
  },
};

export default service;
