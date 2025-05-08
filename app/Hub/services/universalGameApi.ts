import { UniversalGameUrlBase } from "../constants/Endpoints";
import { AddedToGameResult } from "../constants/Types";
import { Result, ok, err } from "neverthrow";

export const addPlayerToGame = async (
  userId: number,
  universalGameId: number
): Promise<Result<AddedToGameResult, Error>> => {
  try {
    const response = await fetch(
      `${UniversalGameUrlBase}?userId=${userId}&universalGameId=${universalGameId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Status was not 200");
    }

    var data: AddedToGameResult = await response.json();
    return ok(data);
  } catch (error) {
    return err(new Error("En feil har skjedd."));
  }
};
