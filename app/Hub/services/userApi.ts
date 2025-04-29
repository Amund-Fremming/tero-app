import { UserUrlBase } from "@/app/Games/AskGame/constants/Endpoints";
import { RegisteredUserRequest, UserBase } from "../constants/Types";

export const updateUserActivity = async (userId: number) => {
  try {
    const response = await fetch(`${UserUrlBase}/${userId}`, {
      method: "PUT",
    });

    if (response.status !== 200) {
      throw new Error("Status was not 200");
    }
  } catch (error) {
    console.error(error);
  }
};

export const createGuestUser = async () => {
  try {
    const response = await fetch(`${UserUrlBase}/create/guest`, {
      method: "POST",
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
