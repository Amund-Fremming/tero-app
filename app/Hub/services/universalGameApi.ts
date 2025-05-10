import { UniversalGameUrlBase } from "../constants/Endpoints";
import { AddedToGameResult } from "../constants/Types";
import { Result, ok, err } from "neverthrow";

export const addPlayerToGame = async (
  userId: number,
  universalGameId: number
): Promise<Result<AddedToGameResult, string>> => {
  try {
    const response = await fetch(`${UniversalGameUrlBase}?userId=${userId}&universalGameId=${universalGameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      const message: string = await response.json();
      return err(message);
    }

    const data: AddedToGameResult = await response.json();
    console.log(data);
    return ok(data);
  } catch (error) {
    return err("En feil har skjedd.");
  }
};
