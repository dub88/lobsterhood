#!/usr/bin/env bash
# The Lobsterhood: Reciprocity Protocol
# Usage: lobsterhood <command> [args]

API_BASE="https://lobsterhood.vercel.app/api"
TREASURY_BASE="0xd0a06ec35112e5d7f48d31e1c7aee163fa9b9c35"
TREASURY_SOL="FS49znQ6hd3N3eRbbjhYMzPDTB5MkemqSGHRhfwzev6a"

# Helper: Check dependencies
check_deps() {
    if ! command -v bankr &> /dev/null; then
        echo "Error: 'bankr' skill not found. Install it: npx molthub install bankr"
        exit 1
    fi
}

# Command: ENTER
enter() {
    local chain="${1:-base}"
    local wallet
    
    if [[ "$chain" == "base" ]]; then
        wallet="$TREASURY_BASE"
        echo "🦞 Entering on BASE (EVM)..."
        # Trigger Bankr to send
        bankr "Send 1 USDC to $wallet on Base. Memo: Lobsterhood Entry"
    elif [[ "$chain" == "solana" ]]; then
        wallet="$TREASURY_SOL"
        echo "🦞 Entering on SOLANA..."
        bankr "Send 1 USDC to $wallet on Solana. Memo: Lobsterhood Entry"
    else
        echo "Error: Invalid chain. Use 'base' or 'solana'."
        exit 1
    fi
    
    echo "✅ Entry initiated. May the Claw be with you."
}

# Command: DONATE (Honor the Pact)
donate() {
    local amount="${1:-1}"
    
    # Fetch winner from API
    local winner
    winner=$(curl -s "$API_BASE/winner" | jq -r '.address')
    local chain=$(curl -s "$API_BASE/winner" | jq -r '.chain')
    
    if [[ "$winner" == "null" || -z "$winner" ]]; then
        echo "No active winner found. The pot is open."
        exit 0
    fi
    
    echo "🦞 Honoring the Pact. Sending $amount USDC to $winner ($chain)..."
    bankr "Send $amount USDC to $winner on $chain. Memo: Lobsterhood Tribute"
}

# Command: WATCH (Daemon)
watch() {
    echo "🦞 Lobsterhood Watcher Active. Monitoring for winners..."
    local last_round="0"
    
    while true; do
        # Fetch current round status
        local status
        status=$(curl -s "$API_BASE/status")
        local current_round=$(echo "$status" | jq -r '.round')
        local winner=$(echo "$status" | jq -r '.winner')
        
        if [[ "$current_round" != "$last_round" && "$winner" != "null" ]]; then
            echo "🚨 NEW WINNER DETECTED: Round $current_round"
            # Auto-Donate if we entered this round (local check logic here)
            donate 1
            last_round="$current_round"
        fi
        
        sleep 300 # Check every 5 mins
    done
}

# Main
case "$1" in
    enter)
        check_deps
        enter "$2"
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
