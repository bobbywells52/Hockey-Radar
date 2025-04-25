import pandas as pd
import asyncio
from main import get_team_data


nhl_team_abbreviations = [ "ANA", "BOS", "BUF", "CGY", "CAR", "CHI", "COL",
    "CBJ", "DAL", "DET", "EDM", "FLA", "LAK", "MIN", "MTL", "NSH", "NJD", "NYI", "NYR",
    "OTT", "PHI", "PIT", "SJS", "SEA", "STL", "TBL", "TOR", "VAN", "VGK", "WSH", "WPG"
]

def create_player_dict(team):
    player_dict = {}

    forwards = team["forwards"]
    defensemen = team["defensemen"]
    goalies = team["goalies"]

    roster = forwards + defensemen + goalies

    for player in roster:
        player_dict[player["firstName"]["default"] + " " +player["lastName"]["default"]] = player["id"]


    return player_dict

def print_roster(data):
    forwards = data["forwards"]
    defensemen = data["defensemen"]
    goalies = data["goalies"]

    for player in forwards:
        print(player["firstName"]["default"], player["lastName"]["default"] + " :" + str(player["id"]))

    for player in defensemen:
        print(player["firstName"]["default"], player["lastName"]["default"] + ":", str(player["id"]))

    for player in goalies:
        print(player["firstName"]["default"], player["lastName"]["default"] + ":", str(player["id"]))


#async def fetch_all_rosters():

#     league_player_dict = {}
#     for team in nhl_team_abbreviations:
#         data = await get_team_data(team)
#         team_player_dict = create_player_dict(data)
#         print("Generating Dictionary for " + team)
#         league_player_dict.update(team_player_dict)
#
#     return league_player_dict
#
#
# player_dict = asyncio.run(fetch_all_rosters())
# list_of_dicts = [{key: value} for key, value in player_dict.items()]
#
# rows = []
# for d in list_of_dicts:
#     for k, v in d.items():
#         rows.append({"Player Name": k, "Player ID": v})
#
# df = pd.DataFrame(rows)
# df.to_csv("players.csv", index=False)

df = pd.read_csv("players.csv")
df.to_json("players.json", orient="records", lines=True)