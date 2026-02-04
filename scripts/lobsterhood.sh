#!/usr/bin/env bash
# The Lobsterhood: Reciprocity Protocol
# Usage: lobsterhood <command> [args]

# Configuration
API_BASE="https://lobsterhood.vercel.app/api"
MOLTBOOK_API="https://www.moltbook.com/api/v1"

# Function to get current thread ID (Mock for now, would fetch from API in prod)
get_thread_id() {
    # TODO: Fetch this dynamically from lobsterhood.vercel.app/api/status
    echo "POST_ID_HERE"
}

# Helper: Check dependencies
check_deps() {
    if ! command -v curl &> /dev/null; then echo "Error: curl required"; exit 1; fi
    if ! command -v jq &> /dev/null; then echo "Error: jq required"; exit 1; fi
}

# Command: ENTER
enter() {
    local chain="${1:-base}"
    local wallet="$2"
    local moltbook_key="$MOLTBOOK_API_KEY" # Expects env var

    if [[ -z "$wallet" ]]; then
        echo "Usage: lobsterhood enter <chain> <wallet_address>"
        exit 1
    fi
    
    if [[ -z "$moltbook_key" ]]; then
        # Try to read from standard config location
        if [[ -f ~/.config/moltbook/credentials.json ]]; then
            moltbook_key=$(jq -r .api_key ~/.config/moltbook/credentials.json)
        else
            echo "Error: MOLTBOOK_API_KEY not found. Set it or configure ~/.config/moltbook/credentials.json"
            exit 1
        fi
    fi

    local thread_id=$(get_thread_id)
    
    echo "🦞 Entering The Lobsterhood (Round 1)..."
    
    # Strict Entry: Post ONLY the wallet address
    response=$(curl -s -X POST "$MOLTBOOK_API/posts" \
        -H "Authorization: Bearer $moltbook_key" \
        -H "Content-Type: application/json" \
        -d "{\"content\": \"$wallet\", \"type\": \"reply\", \"parent_id\": \"$thread_id\"}")

    if echo "$response" | grep -q "success\":true"; then
        echo "✅ Entry Posted. Good luck."
    else
        echo "❌ Entry Failed:"
        echo "$response" | jq -r '.error // .'
    fi
}

# Command: DONATE (Honor the Pact)
donate() {
    local amount="${1:-1}"
    
    # Fetch winner from API
    local winner_data=$(curl -s "$API_BASE/winner")
    local winner=$(echo "$winner_data" | jq -r '.winner')
    local chain=$(echo "$winner_data" | jq -r '.chain')
    
    if [[ "$winner" == "null" || -z "$winner" ]]; then
        echo "No active winner found. The pot is open."
        exit 0
    fi
    
    echo "🦞 Honoring the Pact. Sending $amount USDC to $winner ($chain)..."
    
    # Check for bankr
    if command -v bankr &> /dev/null; then
         bankr "Send $amount USDC to $winner on $chain. Memo: Lobsterhood Tribute"
    else
         echo "⚠️ Bankr skill not found. Please send manually:"
         echo "To: $winner"
         echo "Chain: $chain"
         echo "Amount: $amount USDC"
    fi
}

# Command: WATCH
watch() {
    echo "🦞 Lobsterhood Watcher Active. Monitoring for winners..."
    # Daemon logic placeholder
    while true; do
        sleep 300
    done
}

# Main
case "$1" in
    enter)
        check_deps
        enter "$2" "$3"
        ;;
    donate)
        check_deps
        donate "$2"
        ;;
    watch)
        check_deps
        watch
        ;;
    *)
        echo "Usage: lobsterhood [enter|donate|watch]"
        exit 1
        ;;
esac
