#!/bin/bash

declare -a messages=(
  "Initial HTML layout for landing page"
  "Add responsive CSS and brand colors"
  "Set up contact form HTML structure"
  "Improve mobile layout and navbar"
  "Add social media footer icons"
  "Connect contact form to backend placeholder"
  "Add favicon and metadata"
  "Minify CSS and clean structure"
  "Fix image responsiveness"
)

start_date="2025-03-06"
end_date="2025-04-20"

# Set current date
current=$(date -I -d "$start_date")

index=0
while [[ "$current" < "$end_date" && $index -lt ${#messages[@]} ]]; do
  echo "$current - ${messages[$index]}"
  
  echo "$current" > version.txt
  git add .
  GIT_COMMITTER_DATE="$current 12:00:00" \
  git commit --date="$current 12:00:00" -m "${messages[$index]}"
  
  current=$(date -I -d "$current + 5 days")
  ((index++))
done
