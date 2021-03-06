import pymongo
from Clue import Clue
import warnings
import json
warnings.filterwarnings("ignore")


def getPuzzleFromDB(date):
    """Downloads puzzle from cloud db

    Arguments:
        date -- Date must be in this format as a string: YYYY-MM-DD

    Returns:
        Puzzle dictionary with keys 'clues' and 'cells'
    """
    try:
        client = pymongo.MongoClient(
            "mongodb+srv://emre:r9fPG2T2TK42VR5f@cluster0-kbe7a.mongodb.net/test?retryWrites=true&w=majority")
        db = client["ny-puzzle"]
        collection = db["puzzle-questions"]
        return collection.find_one({"_id": date})
    except:
        print("Cannot connect to database!")
    finally:
        client.close()


def runNewClueGenerator(date):
    puzzle = getPuzzleFromDB(date)
    if puzzle is None:
        raise LookupError(f"Cannot find the puzzle of day {date}")

    for rawClue in puzzle["clues"]:
        clue = Clue(rawClue["text"], rawClue["answer"])
        clue.generateNewClues()
        bestClue = clue.getTheBestClue()
        print(
            f"Selected random clue: {bestClue} ---- Real clue: {rawClue['text']} ---- Answer: {rawClue['answer']}")
        print()
        # Append new clue
        rawClue["newClue"] = bestClue

    return puzzle
