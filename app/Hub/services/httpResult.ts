import { Result, ok, err } from "../utils/result";

class httpResultService {
  constructor() {}

  async simpleGet<T>(url: string): Promise<Result<T>> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const message: string = await response.json();
        return err(message);
      }

      const data: T = await response.json();
      return ok(data);
    } catch (error) {
      console.error(`Get failed. Url: ${url}`);
      return err("Noe gikk galt.");
    }
  }

  async get<Request, Response>(url: string, body: Request): Promise<Result<Response>> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        const message: string = await response.json();
        return err(message);
      }

      const data: Response = await response.json();
      return ok(data);
    } catch (error) {
      console.error(`Get failed. Url: ${url}`);
      return err("Noe gikk galt.");
    }
  }

  async simplePost<Response>(url: string): Promise<Result<Response>> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const message: string = await response.json();
        return err(message);
      }

      const data: Response = await response.json();
      return ok(data);
    } catch (error) {
      console.error(`Post failed. Url: ${url}`);
      return err("Noe gikk galt.");
    }
  }

  async post<Request, Response>(url: string, body: Request): Promise<Result<Response>> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        const message: string = await response.json();
        return err(message);
      }

      const data: Response = await response.json();
      return ok(data);
    } catch (error) {
      console.error(`Post failed. Url: ${url}`);
      console.error(error);
      return err("Noe gikk galt.");
    }
  }

  async simplePut(url: string): Promise<Result> {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const message: string = await response.json();
        return err(message);
      }

      return ok();
    } catch (error) {
      console.error(`Put failed. Url: ${url}`);
      return err("Noe gikk galt.");
    }
  }

  async put<Request, Response>(url: string, body: Request): Promise<Result<Response>> {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        const message: string = await response.json();
        return err(message);
      }

      const data: Response = await response.json();
      return ok(data);
    } catch (error) {
      console.error(`Put failed. Url: ${url}`);
      return err("Noe gikk galt.");
    }
  }
}

var httpResult = new httpResultService();

export default httpResult;
