#!/bin/bash

# Define commit messages
commit_messages=(
  "Initial HTML scaffold"
  "Setup base CSS and fonts"
  "Design hero section"
  "Add services section layout"
  "Insert testimonials placeholder"
  "Make layout mobile responsive"
  "Fix navbar scroll issue"
  "Refactor CSS classes for clarity"
  "Add smooth scroll behavior"
  "Add favicon and meta tags"
  "Update color scheme"
  "Fix padding and spacing issues"
  "Add animated CTA button"
  "Refine footer layout"
  "Optimize hero image"
  "Embed contact form"
  "Minify CSS"
  "Fix broken links"
  "Improve contrast for accessibility"
  "Deploy to Vercel"
)

start_date="2025-03-06"
end_date="2025-04-18"
current_date=$(date -I -d "$start_date")

# Loop over each day
while [[ "$current_date" < "$end_date" ]]; do
  # Random number of commits for the day (2–10)
  commits_today=$(( (RANDOM % 9) + 2 ))

  for ((i = 0; i < commits_today; i++)); do
    # Pick random commit message
    msg=${commit_messages[$RANDOM % ${#commit_messages[@]}]}

    # Modify a dummy file
    echo "$current_date – $msg – $i" >> progress.log
    git add .

    # Random time between 09:00 and 18:00
    hour=$(( (RANDOM % 9) + 9 ))
    minute=$(( RANDOM % 60 ))
    second=$(( RANDOM % 60 ))

    commit_time="$current_date $hour:$minute:$second"

    GIT_COMMITTER_DATE="$commit_time" \
    git commit --date="$commit_time" -m "$msg"
  done

  # Move to next day
  current_date=$(date -I -d "$current_date + 1 day")
done
