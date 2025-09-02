import { SpinGameUrlBase } from "@/src/common/constants/endpoints";
import httpResult from "@/src/common/services/httpResult";
import SpinGame, { CreateSpinGameRequest } from "../constants/spinTypes";
import { Result } from "@/src/common/utils/result";

export const getSpinGame = async (userId: number, gameId: number): Promise<Result<SpinGame>> => {
  const url = `${SpinGameUrlBase}/user/${userId}/game/${gameId}`;
  return await httpResult.simpleGet(url);
};

export const createGame = async (request: CreateSpinGameRequest): Promise<Result<SpinGame>> => {
  return await httpResult.post<CreateSpinGameRequest, SpinGame>(SpinGameUrlBase, request);
};
