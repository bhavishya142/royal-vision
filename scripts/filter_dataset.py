from pathlib import Path
import pandas as pd

# Project root
BASE_DIR = Path(__file__).resolve().parent.parent

# File paths
raw_matches = BASE_DIR / "datasets" / "raw" / "matches.csv"
raw_deliveries = BASE_DIR / "datasets" / "raw" / "deliveries.csv"

processed_matches = BASE_DIR / "datasets" / "processed" / "matches_2022_2025.csv"
processed_deliveries = BASE_DIR / "datasets" / "processed" / "deliveries_2022_2025.csv"

# -------------------------
# Filter Matches
# -------------------------
matches = pd.read_csv(raw_matches)

matches["date"] = pd.to_datetime(matches["date"])

filtered_matches = matches[
    (matches["date"].dt.year >= 2022) &
    (matches["date"].dt.year <= 2025)
]

filtered_matches.to_csv(processed_matches, index=False)

print("✅ Matches filtered:", len(filtered_matches))

# -------------------------
# Filter Deliveries
# -------------------------
deliveries = pd.read_csv(raw_deliveries)

match_ids = filtered_matches["id"]

filtered_deliveries = deliveries[
    deliveries["match_id"].isin(match_ids)
]

filtered_deliveries.to_csv(processed_deliveries, index=False)

print("✅ Deliveries filtered:", len(filtered_deliveries))

print("🎉 ETL Completed Successfully!")