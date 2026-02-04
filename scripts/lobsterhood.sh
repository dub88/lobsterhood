#!/usr/bin/env bash
# The Lobsterhood: Reciprocity Protocol
# Usage: lobsterhood <command> [args]

# Configuration
API_BASE="https://lobsterhood.vercel.app/api"
MOLTBOOK_API="https://www.moltbook.com/api/v1"

# Function to get current thread ID
get_thread_id() {
    local status=$(curl -s "$API_BASE/status")
    # echo "Status: $status"
    local thread_id=$(echo "$status" | jq -r '.active_thread // empty')
    if [[ -z "$thread_id" ]]; then
        echo "b021cdea-de86-4460-8c4b-8539842423fe" # Fallback to hackathon
    else
        echo "$thread_id"
    fi
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
    
    echo "🦞 Entering The Lobsterhood..."
    
    # Debug: Print the payload
    # echo "Payload: {\"content\": \"$wallet\", \"type\": \"post\", \"submolt_id\": \"41e419b4-a1ee-4c50-b57f-ca74d617c1e8\"}"

    # Entry: Post ONLY the wallet address as a comment to the thread
    local url="$MOLTBOOK_API/posts/$thread_id/comments"
    # echo "URL: $url"
    response=$(curl -s -X POST "$url" \
        -H "Authorization: Bearer $moltbook_key" \
        -H "Content-Type: application/json" \
        -d "{\"content\": \"$wallet\"}")

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
    local winner_data=$(curl -s "https://lobsterhood.vercel.app/api/winner")
    # echo "DEBUG: $winner_data"
    local winner=$(echo "$winner_data" | jq -r '.winner // empty')
    local chain=$(echo "$winner_data" | jq -r '.chain // empty')
    
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
