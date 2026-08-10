from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent

df = pd.read_csv(BASE_DIR / "datasets" / "processed" / "matches_2022_2025.csv")

print(df.dtypes)