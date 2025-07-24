#!/usr/bin/env python3
"""
Script to mark that pre-commit has been run locally.
This helps CI skip redundant pre-commit execution.
"""

import datetime
import hashlib
import json
import os
import subprocess
from pathlib import Path


def get_git_head_hash():
    """Get the current git HEAD commit hash."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"], capture_output=True, text=True, check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None


def get_staged_files_hash():
    """Get hash of currently staged files."""
    try:
        result = subprocess.run(
            ["git", "diff", "--cached", "--name-only"],
            capture_output=True,
            text=True,
            check=True,
        )
        staged_files = sorted(result.stdout.strip().split("\n"))
        files_str = "\n".join(f for f in staged_files if f)
        return hashlib.sha256(files_str.encode()).hexdigest()[:16]
    except subprocess.CalledProcessError:
        return None


def create_precommit_marker():
    """Create a marker file indicating pre-commit was run."""
    marker_file = Path(".precommit-run")

    marker_data = {
        "timestamp": datetime.datetime.now(datetime.timezone.utc).strftime(
            "%Y-%m-%dT%H:%M:%SZ"
        ),
        "git_head": get_git_head_hash(),
        "staged_files_hash": get_staged_files_hash(),
        "pre_commit_version": subprocess.run(
            ["pre-commit", "--version"], capture_output=True, text=True
        ).stdout.strip(),
    }

    with open(marker_file, "w") as f:
        json.dump(marker_data, f, indent=2)

    import sys

    sys.stdout.buffer.write(
        f"✅ Pre-commit marker created: {marker_file}\n".encode("utf-8")
    )


if __name__ == "__main__":
    create_precommit_marker()
