import AskGame, { CreateAskGameRequest } from "../constants/AskTypes";
import { AskGameUrlBase } from "../../../Hub/constants/Endpoints";
import { Result } from "neverthrow";
import { CreateGameResponse, PagedRequest, PagedResponse } from "@/app/Hub/constants/Types";
import httpResult from "@/app/Hub/services/HttpResult";

export const createGame = async (
  createGameRequest: CreateAskGameRequest
): Promise<Result<CreateGameResponse, string>> =>
  await httpResult.post<CreateAskGameRequest, CreateGameResponse>(AskGameUrlBase, createGameRequest);

export const getGame = async () => await httpResult.simpleGet<AskGame>(AskGameUrlBase);

export const getGamesPage = async (body: PagedRequest): Promise<Result<PagedResponse<AskGame>, string>> => {
  const url = `${AskGameUrlBase}/page`;
  return await httpResult.get<PagedRequest, PagedResponse<AskGame>>(url, body);
};

export default { createGame };
