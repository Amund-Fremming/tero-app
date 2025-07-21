import AskGame, { CreateAskGameRequest } from "../constants/AskTypes";
import { AskGameUrlBase } from "../../Common/constants/Endpoints";
import { Result } from "@/app/Common/utils/result";
import httpResult from "@/app/Common/services/httpResult";

export const createGame = async (createGameRequest: CreateAskGameRequest): Promise<Result<AskGame>> =>
  await httpResult.post<CreateAskGameRequest, AskGame>(AskGameUrlBase, createGameRequest);

export const getGame = async (id: number) => {
  const url = `${AskGameUrlBase}/${id}`;
  return await httpResult.simpleGet<AskGame>(url);
};

export default { createGame };
