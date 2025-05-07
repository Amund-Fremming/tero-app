import { UserUrlBase } from "@/app/Hub/constants/Endpoints";
import { RegisteredUserRequest, UserBase } from "../constants/Types";
import { Result, ok, err } from "neverthrow";

export const updateUserActivity = async (
  userId: number
): Promise<Result<void, string>> => {
  try {
    const response = await fetch(`${UserUrlBase}/${userId}`, {
      method: "PUT",
    });

    if (response.status !== 200) {
      return err("Status was not 200");
    }

    return ok(undefined);
  } catch (error) {
    console.error(error);
    return err("Failed to update user activity.");
  }
};

export const createGuestUser = async (): Promise<Result<UserBase, string>> => {
  try {
    const response = await fetch(`${UserUrlBase}/create/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return err("Status was not 200");
    }

    const data: UserBase = await response.json();
    return ok(data);
  } catch (error) {
    return err("Failed to create guest user.");
  }
};

export const createRegisteredUser = async (request: RegisteredUserRequest) => {
  try {
    const response = await fetch(`${UserUrlBase}/create/registered`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (response.status !== 200) {
      throw new Error("Status was not 200");
    }

    const data: UserBase = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const doesUserExist = async (userId: number) => {
  try {
    const response = await fetch(`${UserUrlBase}/${userId}`, {
      method: "GET",
    });

    if (response.status !== 200) {
      throw new Error("Status was not 200");
    }

    var data: boolean = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  updateUserActivity,
  createGuestUser,
  createRegisteredUser,
  doesUserExist,
};
