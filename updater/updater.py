import requests, json, time
from datetime import datetime

def fetch_instances():
    r = requests.get("https://searx.space/data/instances.json")
    all_instances = r.json()["instances"]

    european_instances = [
        url for url, data in all_instances.items()
        if data.get("info", {}).get("location", {}).get("continent_code") == "EU"
        and data.get("metrics", {}).get("http_status_code") == 200
        and not data.get("info", {}).get("logging", True)
        and data.get("software", {}).get("name") == "searxng"
    ]

    print(f"[{datetime.now()}] Found {len(european_instances)} EU instances")

    with open("/data/instances.json", "w") as f:
        json.dump(european_instances, f, indent=2)

if __name__ == "__main__":
    fetch_instances()