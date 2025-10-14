import { AskGame, CreateAskGameRequest } from "../constants/askTypes";
import { AskGameUrlBase } from "@/src/common/constants/endpoints";
import { Result } from "@/src/common/utils/result";
import httpResult from "@/src/common/services/httpResult";

export const createGame = async (createGameRequest: CreateAskGameRequest): Promise<Result<AskGame>> =>
  await httpResult.post<CreateAskGameRequest, AskGame>(AskGameUrlBase, createGameRequest);

export const getAskGame = async (id: number): Promise<Result<AskGame>> => {
  const url = `${AskGameUrlBase}/${id}`;
  return await httpResult.simpleGet<AskGame>(url);
};

export default { createGame, getGame: getAskGame };
