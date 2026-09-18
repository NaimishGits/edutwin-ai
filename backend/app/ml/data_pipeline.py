"""Pandas/NumPy preparation utilities for a labelled student dataset.

Expected CSV columns: cgpa, attendance, study_hours_per_day,
assignment_completion, coding_problems_per_month, and career_outcome.
"""

from pathlib import Path

import numpy as np
import pandas as pd

FEATURE_COLUMNS = [
    "cgpa",
    "attendance",
    "study_hours_per_day",
    "assignment_completion",
    "coding_problems_per_month",
]
TARGET_COLUMN = "career_outcome"


def load_and_prepare_dataset(csv_path: str | Path) -> tuple[np.ndarray, np.ndarray, list[str]]:
    """Load a labelled CSV, clean numeric features, and return model-ready arrays.

    This is deliberately separate from the live API. It is used only once a
    real labelled dataset is available for training and evaluation.
    """
    data = pd.read_csv(csv_path)
    missing = set(FEATURE_COLUMNS + [TARGET_COLUMN]) - set(data.columns)
    if missing:
        raise ValueError(f"Dataset is missing required columns: {', '.join(sorted(missing))}")

    features = data[FEATURE_COLUMNS].apply(pd.to_numeric, errors="coerce")
    features = features.fillna(features.median(numeric_only=True)).fillna(0)
    targets = data[TARGET_COLUMN].astype(str).str.strip()
    valid_rows = targets.ne("") & targets.ne("nan")

    # NumPy provides the numeric matrices passed to scikit-learn later.
    return (
        features.loc[valid_rows].to_numpy(dtype=np.float64),
        targets.loc[valid_rows].to_numpy(dtype=str),
        FEATURE_COLUMNS,
    )
