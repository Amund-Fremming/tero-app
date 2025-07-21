import { SpinGameUrlBase } from "@/app/Common/constants/Endpoints";
import httpResult from "@/app/Common/services/httpResult";
import SpinGame, { CreateSpinGameRequest } from "../constants/SpinTypes";
import { Result } from "@/app/Common/utils/result";

export const getGame = async (userId: number, gameId: number): Promise<Result<SpinGame>> => {
  const url = `${SpinGameUrlBase}/user/${userId}/game/${gameId}`;
  return await httpResult.simpleGet(url);
};

export const createGame = async (request: CreateSpinGameRequest): Promise<Result<SpinGame>> => {
  return await httpResult.post<CreateSpinGameRequest, SpinGame>(SpinGameUrlBase, request);
};
