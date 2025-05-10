import AskGame, { CreateAskGameRequest } from "../constants/AskTypes";
import { AskGameUrlBase } from "../../../Hub/constants/Endpoints";
import { Result, ok, err } from "neverthrow";
import { CreateGameResponse } from "@/app/Hub/constants/Types";

export const startGame = async (gameId: number): Promise<Result<AskGame, string>> => {
  try {
    const response = await fetch(`${AskGameUrlBase}/${gameId}`, {
      method: "GET",
    });

    if (response.status !== 200) {
      const message: string = await response.json();
      return err(message);
    }

    const data: AskGame = await response.json();
    console.log("Game recieved: ", data);
    return ok(data);
  } catch (error) {
    console.error("startGame");
    return err("Noe gikk galt.");
  }
};

export const createGame = async (
  createGameRequest: CreateAskGameRequest
): Promise<Result<CreateGameResponse, string>> => {
  try {
    const response = await fetch(AskGameUrlBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createGameRequest),
    });

    if (response.status !== 200) {
      const message: string = await response.json();
      return err(message);
    }

    const data: CreateGameResponse = await response.json();
    return ok(data);
  } catch (error) {
    console.error("createGame");
    return err("Noe gikk galt.");
  }
};

export default { startGame, createGame };
