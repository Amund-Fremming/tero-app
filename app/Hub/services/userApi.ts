import { UserUrlBase } from "@/app/Hub/constants/Endpoints";
import { RegisteredUserRequest, UserBase } from "../constants/Types";
import { Result } from "neverthrow";
import httpResult from "./HttpResult";

export const updateUserActivity = async (userId: number): Promise<Result<void, string>> => {
  const url = `${UserUrlBase}/${userId}`;
  return httpResult.simplePut(url);
};

export const createGuestUser = async (): Promise<Result<UserBase, string>> => {
  const url = `${UserUrlBase}/create/guest`;
  return httpResult.simplePost(url);
};

export const createRegisteredUser = async (request: RegisteredUserRequest) => {
  const url = `${UserUrlBase}/create/registered`;
  return await httpResult.post<RegisteredUserRequest, UserBase>(url, request);
};

export const doesUserExist = async (userId: number) => {
  const url = `${UserUrlBase}/${userId}`;
  return await httpResult.simpleGet<boolean>(url);
};

export default {
  updateUserActivity,
  createGuestUser,
  createRegisteredUser,
  doesUserExist,
};
