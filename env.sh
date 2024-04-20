find . -type f -name ".env.example" -exec bash -c '
    # Define the function within the -exec command
    copy_env_example() {
        local file="$1"
        if [[ -f "$file" ]]; then
            cp -p "$file" "${file/.env.example/.env}"
        fi
    }
    # Execute the function for each found file
    copy_env_example "$0"
' {} \;
echo "Finished processing files."