#!/usr/bin/env bash
set -euo pipefail

COMPONENT="${1:-${FRONTPOST_COMPONENT:-FrontPost-Unknown}}"
ENVIRONMENT="${FRONTPOST_ENV:-local}"
VERSION="${FRONTPOST_VERSION:-0.1.0}"

cat <<BANNER

✦ FrontPost · 前沿邮报
Component: ${COMPONENT}
Environment: ${ENVIRONMENT}
Version: ${VERSION}

BANNER
