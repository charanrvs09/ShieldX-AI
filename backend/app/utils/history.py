import json
from datetime import datetime

FILE_PATH = "scan_history.json"


def save_scan(scan_type, prediction, risk):
    try:
        with open(FILE_PATH, "r") as file:
            data = json.load(file)
    except Exception:
        data = []

    data.append(
        {
            "type": scan_type,
            "prediction": prediction,
            "risk": risk,
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }
    )

    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=2)


def get_history():
    try:
        with open(FILE_PATH, "r") as file:
            return json.load(file)
    except Exception:
        return []