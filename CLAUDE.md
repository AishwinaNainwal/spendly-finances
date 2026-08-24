# Spendly — Project Guide for Claude

## Environment

This machine uses **Anaconda3** (`conda 24.11.1`, Python 3.12.7 in base env at `/opt/anaconda3/bin/python`). It also has `/usr/bin/python3` (Python 3.9.6, system Python).

**Always use the project-local conda environment, never `python -m venv`.** The previous venv in `venv/` shipped with stub pip files and a non-executable `activate` script — that approach is unreliable on this machine.

### Project conda env

| Property | Value |
| --- | --- |
| Name | `spendly-env` |
| Python | 3.11.15 |
| Location | `/opt/anaconda3/envs/spendly-env` |
| Activator | `source /opt/anaconda3/etc/profile.d/conda.sh` then `conda activate spendly-env` |

### Standard activation + run

```bash
source /opt/anaconda3/etc/profile.d/conda.sh
conda activate spendly-env
python app.py
```

If the Bash tool runs each command in its own shell (no persistence between calls), activate and run inline:

```bash
source /opt/anaconda3/etc/profile.d/conda.sh && conda activate spendly-env && python app.py
```

Or bypass `activate` entirely by calling the env's Python directly:

```bash
/opt/anaconda3/envs/spendly-env/bin/python app.py
```

The last form is the most reliable in scripted/Bash-tool contexts.

### Recreating the env from scratch

```bash
conda create -n spendly-env python=3.11 -y
source /opt/anaconda3/etc/profile.d/conda.sh && conda activate spendly-env
pip install -r requirements.txt
```

### Verifying the env

```bash
which python          # → /opt/anaconda3/envs/spendly-env/bin/python
python --version      # → Python 3.11.x
which pip             # → /opt/anaconda3/envs/spendly-env/bin/pip
pip list | grep -i flask
python -c "import flask; print(flask.__version__)"   # → 3.1.3
```

### Smoke test

The app runs on port **5001** (configured in `app.py`). If port 5001 is in use, free it first:

```bash
lsof -ti:5001 | xargs kill -9 2>/dev/null
```

Then start the app and curl it:

```bash
python app.py &        # or run in background
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1:5001/
```

### Don'ts

- ❌ Don't run `python -m venv venv` — produces broken venvs on this machine.
- ❌ Don't `source venv/bin/activate` — the file isn't executable and the `pip` inside is a 268-byte stub.
- ❌ Don't rely on `venv/bin/python` pointing to a working interpreter — it may point at CommandLineTools Python without the packages.
- ❌ Don't `pip install` without first activating `spendly-env` — otherwise packages go to the anaconda3 base and the env doesn't see them.

### Legacy `venv/` directory

The broken `venv/` directory at the project root is ignored by `.gitignore` but still on disk. Safe to delete with `rm -rf venv/` once `spendly-env` is verified working.