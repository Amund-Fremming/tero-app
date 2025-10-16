import { UserUrlBase } from "../constants/endpoints";
import { RegisteredUserRequest, UserBase } from "../constants/types";
import { ok, Result } from "../utils/result";
import httpResult from "./httpResult";

export const updateUserActivity = async (userId: string): Promise<Result> => {
  // TODO
  return ok();
};

export const createGuestUser = async (): Promise<Result<string>> => {
  // TODO
  return ok("[NOT_IMPLEMENTED]");
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
