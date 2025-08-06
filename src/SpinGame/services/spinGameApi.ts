import { SpinGameUrlBase } from "@/src/Common/constants/Endpoints";
import httpResult from "@/src/Common/services/httpResult";
import SpinGame, { CreateSpinGameRequest } from "../constants/SpinTypes";
import { Result } from "@/src/Common/utils/result";

export const getSpinGame = async (userId: number, gameId: number): Promise<Result<SpinGame>> => {
  const url = `${SpinGameUrlBase}/user/${userId}/game/${gameId}`;
  return await httpResult.simpleGet(url);
};

export const createGame = async (request: CreateSpinGameRequest): Promise<Result<SpinGame>> => {
  return await httpResult.post<CreateSpinGameRequest, SpinGame>(SpinGameUrlBase, request);
};
